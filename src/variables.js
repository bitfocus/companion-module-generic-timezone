module.exports = {
	initVariables: function () {
		let self = this;
		let variables = []

		variables.push({ variableId: 'timezone', name: 'Timezone Abbreviation' });
		variables.push({ variableId: 'timezoneName', name: 'Timezone Name' });
		variables.push({ variableId: 'timezoneLocation', name: 'Timezone Location' });
		variables.push({ variableId: 'timezoneOffsetHours', name: 'Timezone Offset Hours' });
		variables.push({ variableId: 'timezoneOffsetMinutes', name: 'Timezone Offset Minutes' });
		variables.push({ variableId: 'timezoneOffsetDirection', name: 'Timezone Offset Direction' });

		variables.push({ variableId: 'date', name: 'Date' });
		variables.push({ variableId: 'day', name: 'Day' });
		variables.push({ variableId: 'month', name: 'Month' });
		variables.push({ variableId: 'year', name: 'Year' });

		variables.push({ variableId: 'time_hms24', name: 'Time of day (HH:MM:SS)' });
		variables.push({ variableId: 'time_hms12', name: 'Time of day (hh:MM:SS)' });
		variables.push({ variableId: 'time_h24', name: 'Time of day (HH)' });
		variables.push({ variableId: 'time_h12', name: 'Time of day (hh)' });
		variables.push({ variableId: 'time_hm24', name: 'Time of day (HH:MM)' });
		variables.push({ variableId: 'time_hm12', name: 'Time of day (hh:MM)' });
		variables.push({ variableId: 'time_m', name: 'Time of day (MM)' });
		variables.push({ variableId: 'time_s', name: 'Time of day (SS)' });
		variables.push({ variableId: 'time_meridiem', name: 'Time of day Meridiem' });
		variables.push({ variableId: 'time_unix', name: 'UNIX timestamp (s)' });
		
		self.setVariableDefinitions(variables);
	}
}