const { test } = require('node:test')
const assert = require('node:assert/strict')
const vm = require('node:vm')
const fs = require('node:fs')
const path = require('node:path')

// Load the actual instance with a minimal host and a deterministic clock.
function instanceAt(instant) {
	const timers = new Map()
	let nextTimer = 0
	let Instance
	const base = {
		InstanceBase: class {
			setActionDefinitions() {}
			setFeedbackDefinitions() {}
			setPresetDefinitions() {}
			setVariableDefinitions(definitions) {
				this.definitions = definitions
			}
			setVariableValues(values) {
				this.values = values
			}
			updateStatus(status) {
				this.status = status
			}
		},
		InstanceStatus: { Ok: 'ok' },
		combineRgb: () => 0,
		runEntrypoint: (value) => {
			Instance = value
		},
	}
	const cache = new Map()
	function load(filename) {
		if (cache.has(filename)) return cache.get(filename).exports
		const module = { exports: {} }
		cache.set(filename, module)
		const context = {
			module,
			exports: module.exports,
			require: (name) =>
				name === '@companion-module/base'
					? base
					: load(require.resolve(path.resolve(path.dirname(filename), name))),
			Date: class extends Date {
				constructor(...args) {
					super(...(args.length ? args : [instant]))
				}
			},
			setInterval: (fn, ms) => {
				assert.equal(ms, 500)
				timers.set(++nextTimer, fn)
				return nextTimer
			},
			clearInterval: (id) => timers.delete(id),
		}
		vm.runInNewContext(fs.readFileSync(filename, 'utf8'), context, { filename })
		return module.exports
	}
	load(path.resolve(__dirname, '../index.js'))
	return { instance: new Instance({}), timers }
}

for (const [timezone, instant, date, time] of [
	['UTC', '2024-02-29T00:04:05Z', 'Thu Feb 29 2024', '0:04:05'],
	['NPT', '2024-12-31T20:00:09Z', 'Wed Jan 01 2025', '1:45:09'],
	['NST', '2024-01-01T01:00:09Z', 'Sun Dec 31 2023', '21:30:09'],
	['EST', '2024-03-10T07:00:00Z', 'Sun Mar 10 2024', '2:00:00'],
	['EDT', '2024-03-10T07:00:00Z', 'Sun Mar 10 2024', '3:00:00'],
]) {
	test(`${timezone} preserves fixed-offset date and time at ${instant}`, async () => {
		const { instance, timers } = instanceAt(instant)
		await instance.init({ timezone, custom: false })
		Array.from(timers.values())[0]()
		assert.equal(instance.values.date, date)
		assert.equal(instance.values.time_hms24, time)
		assert.equal(instance.values.timezone, timezone)
		assert.equal(instance.definitions.length, 20)
		assert.deepEqual(
			Object.keys(instance.values).sort(),
			Array.from(instance.definitions, (v) => v.variableId).sort(),
		)
		await instance.destroy()
		assert.equal(timers.size, 0)
	})
}

test('configuration IDs, custom visibility, variable formatting and current timer cleanup', async () => {
	const { instance, timers } = instanceAt('2024-01-01T00:15:07Z')
	const fields = instance.getConfigFields()
	assert.deepEqual(
		Array.from(fields, (f) => f.id),
		[
			'info',
			'timezone',
			'custom',
			'customName',
			'customHours',
			'customMinutes',
			'direction',
		],
	)
	for (const field of fields.filter((f) => f.isVisible)) {
		assert.equal(field.isVisible({ custom: false }), false)
		assert.equal(field.isVisible({ custom: true }), true)
	}
	await instance.init({
		custom: true,
		customName: 'Test',
		customHours: '1',
		customMinutes: '30',
		direction: 'backward',
	})
	Array.from(timers.values())[0]()
	assert.equal(instance.values.time_hms24, '22:45:07')
	assert.equal(instance.values.date, 'Sun Dec 31 2023')
	assert.equal(instance.values.timezoneName, 'Test')
	assert.equal(instance.values.timezoneOffsetHours, '-1')
	assert.equal(instance.values.timezoneOffsetMinutes, '-30')
	await instance.destroy()
	await instance.configUpdated({
		custom: true,
		customName: 'Invalid numbers',
		customHours: 'invalid',
		customMinutes: '',
		direction: 'forward',
	})
	Array.from(timers.values())[0]()
	assert.equal(instance.values.time_hms24, '0:15:07')
	assert.equal(instance.values.time_hms12, '0:15:07')
	assert.equal(instance.values.time_meridiem, 'AM')
	await instance.destroy()
	assert.equal(timers.size, 0)
})
