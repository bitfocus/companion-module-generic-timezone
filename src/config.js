const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module displays the current time in a timezone of your choice.',
			},
			{
				type: 'dropdown',
				id: 'timezone',
				width: 12,
				label: 'Timezone',
				default: 'EST',
				choices: this.TIMEZONES,
			},
			{
				type: 'checkbox',
				id: 'custom',
				width: 12,
				label: 'Custom Timezone',
				default: false,
			},
			{
				type: 'textinput',
				id: 'customName',
				width: 12,
				label: 'Custom Timezone Name',
				default: 'Custom',
				isVisible: (config) => config.custom,
			},
			{
				type: 'textinput',
				id: 'customHours',
				width: 4,
				label: 'Offset Hours',
				default: '5',
				isVisible: (config) => config.custom,
			},
			{
				type: 'textinput',
				id: 'customMinutes',
				width: 4,
				label: 'Offset Minutes',
				default: '0',
				isVisible: (config) => config.custom,
			},
			{
				type: 'dropdown',
				id: 'direction',
				width: 4,
				label: 'Direction',
				default: 'forward',
				choices: [
					{ id: 'forward', label: 'Forward' },
					{ id: 'backward', label: 'Backward' },
				],
				isVisible: (config) => config.custom,
			}
		]
	},
}