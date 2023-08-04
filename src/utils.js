module.exports = {
	initTimer: function () {
		let self = this;

		self.timer = setInterval(() => {
			let abbreviation = '';
			let location = '';
			let label = '';

			let hours = 0;
			let minutes = 0;
			let direction = 'forward';

			if (self.config.custom) {
				label = self.config.customName;
				location = 'Custom';

				hours = parseInt(self.config.customHours);
				minutes = parseInt(self.config.customMinutes);

				direction = self.config.direction;
			}
			else {
				let timezone = self.TIMEZONES.find((timezone) => timezone.id === self.config.timezone);

				abbreviation = timezone.id;
				label = timezone.label;
				location = timezone.location;

				let offset = timezone.offset;

				if (offset.indexOf(':') > -1) {
					let offsetParts = offset.split(':');

					hours = offsetParts[0].replace('+', '').replace('-', '');
					minutes = offsetParts[1];
				}
				else {
					hours = offset.replace('+', '').replace('-', '');
					minutes = 0;
				}

				hours = parseInt(hours);
				minutes = parseInt(minutes);

				if (offset.indexOf('+') > -1) {
					direction = 'forward';
				}
				else {
					direction = 'backward';
				}
			}

			//make sure hours and minutes are not nan
			if (isNaN(hours)) {
				hours = 0;
			}

			if (isNaN(minutes)) {
				minutes = 0;
			}

			let timeOffsetMinutes = (hours * 60) + minutes;

			if (direction === 'backward') {
				timeOffsetMinutes = timeOffsetMinutes * -1;
			}

			let localDate = new Date();
			localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset() + timeOffsetMinutes);

			let hoursString = localDate.getHours().toString();
			let minutesString = localDate.getMinutes().toString();
			let secondsString = localDate.getSeconds().toString();

			if (minutesString.length === 1) {
				minutesString = '0' + minutesString;
			}

			if (secondsString.length === 1) {
				secondsString = '0' + secondsString;
			}

			let dateString = localDate.toDateString();
			let timeString = hoursString + ':' + minutesString + ':' + secondsString;

			self.setVariableValues({
				timezone: abbreviation,
				timezoneName: label,
				timezoneLocation: location,
				timezoneOffsetHours: direction == 'forward' ? '+' : '-' + hours,
				timezoneOffsetMinutes: (minutes > 0 ? (direction == 'forward' ? '+' : '-') : '') + minutes,
				timezoneOffsetDirection: direction,

				date: dateString,
				day: localDate.getDate().toString(),
				month: (localDate.getMonth() + 1).toString(),
				year: localDate.getFullYear().toString(),

				time_hms24: timeString,
				time_hms12: (localDate.getHours() % 12).toString() + ':' + minutesString + ':' + secondsString,
				time_h24: hoursString,
				time_h12: (localDate.getHours() % 12).toString(),
				time_hm24: hoursString + ':' + minutesString,
				time_hm12: (localDate.getHours() % 12).toString() + ':' + minutesString,
				time_m: minutesString,
				time_s: secondsString,
				time_meridiem: localDate.getHours() > 12 ? 'PM' : 'AM',
				time_unix: localDate.getTime()
			});
		}, 500);
	},

	TIMEZONES: [
		{ id: 'A', label: 'Alfa Time Zone', location: 'Military', offset: '+1' },
		{ id: 'ACDT', label: 'Australian Central Daylight Time', location: 'Australia', offset: '+10:30' },
		{ id: 'ACST', label: 'Australian Central Standard Time', location: 'Australia', offset: '+9:30' },
		{ id: 'ACT', label: 'Acre Time', location: 'South America', offset: '-5' },
		{ id: 'ACT', label: 'Australian Central Time', location: 'Australia', offset: '+9:30' },
		{ id: 'ACWST', label: 'Australian Central Western Standard Time', location: 'Australia', offset: '+8:45' },
		{ id: 'ADT', label: 'Arabia Daylight Time', location: 'Asia', offset: '+4' },
		{ id: 'ADT', label: 'Atlantic Daylight Time', location: 'North America - Atlantic', offset: '-3' },
		{ id: 'AEDT', label: 'Australian Eastern Daylight Time', location: 'Australia', offset: '+11' },
		{ id: 'AEST', label: 'Australian Eastern Standard Time', location: 'Australia', offset: '+10' },
		{ id: 'AET', label: 'Australian Eastern Time', location: 'Australia', offset: '+10:00' },
		{ id: 'AFT', label: 'Afghanistan Time', location: 'Asia', offset: '+4:30' },
		{ id: 'AKDT', label: 'Alaska Daylight Time', location: 'North America', offset: '-8' },
		{ id: 'AKST', label: 'Alaska Standard Time', location: 'North America', offset: '-9' },
		{ id: 'ALMT', label: 'Alma-Ata Time', location: 'Asia', offset: '+6' },
		{ id: 'AMST', label: 'Amazon Summer Time', location: 'South America', offset: '-3' },
		{ id: 'AMST', label: 'Armenia Summer Time', location: 'Asia', offset: '+5' },
		{ id: 'AMT', label: 'Amazon Time', location: 'South America', offset: '-4' },
		{ id: 'AMT', label: 'Armenia Time', location: 'Asia', offset: '+4' },
		{ id: 'ANAST', label: 'Anadyr Summer Time', location: 'Asia', offset: '+12' },
		{ id: 'ANAT', label: 'Anadyr Time', location: 'Asia', offset: '+12' },
		{ id: 'AQTT', label: 'Aqtobe Time', location: 'Asia', offset: '+5' },
		{ id: 'ART', label: 'Argentina Time', location: 'Antarctica', offset: '-3' },
		{ id: 'AST', label: 'Arabia Standard Time', location: 'Asia', offset: '+3' },
		{ id: 'AST', label: 'Atlantic Standard Time', location: 'North America', offset: '-4' },
		{ id: 'AT', label: 'Atlantic Time', location: 'North America', offset: '-4:00' },
		{ id: 'AWDT', label: 'Australian Western Daylight Time', location: 'Australia', offset: '+9' },
		{ id: 'AWST', label: 'Australian Western Standard Time', location: 'Australia', offset: '+8' },
		{ id: 'AZOST', label: 'Azores Summer Time', location: 'Atlantic', offset: '+0' },
		{ id: 'AZOT', label: 'Azores Time', location: 'Atlantic', offset: '-1' },
		{ id: 'AZST', label: 'Azerbaijan Summer Time', location: 'Asia', offset: '+5' },
		{ id: 'AZT', label: 'Azerbaijan Time', location: 'Asia', offset: '+4' },
		{ id: 'AoE', label: 'Anywhere on Earth', location: 'Pacific', offset: '-12' },
		{ id: 'B', label: 'Bravo Time Zone', location: 'Military', offset: '+2' },
		{ id: 'BNT', label: 'Brunei Darussalam Time', location: 'Asia', offset: '+8' },
		{ id: 'BOT', label: 'Bolivia Time', location: 'South America', offset: '-4' },
		{ id: 'BRST', label: 'Brasília Summer Time', location: 'South America', offset: '-2' },
		{ id: 'BRT', label: 'Brasília Time', location: 'South America', offset: '-3' },
		{ id: 'BST', label: 'Bangladesh Standard Time', location: 'Asia', offset: '+6' },
		{ id: 'BST', label: 'Bougainville Standard Time', location: 'Pacific', offset: '+11' },
		{ id: 'BST', label: 'British Summer Time', location: 'Europe', offset: '+1' },
		{ id: 'BTT', label: 'Bhutan Time', location: 'Asia', offset: '+6' },
		{ id: 'C', label: 'Charlie Time Zone', location: 'Military', offset: '+3' },
		{ id: 'CAST', label: 'Casey Time', location: 'Antarctica', offset: '+8' },
		{ id: 'CAT', label: 'Central Africa Time', location: 'Africa', offset: '+2' },
		{ id: 'CCT', label: 'Cocos Islands Time', location: 'Indian Ocean', offset: '+6:30' },
		{ id: 'CDT', label: 'Central Daylight Time', location: 'North America', offset: '-5' },
		{ id: 'CDT', label: 'Cuba Daylight Time', location: 'Caribbean', offset: '-4' },
		{ id: 'CEST', label: 'Central European Summer Time', location: 'Europe', offset: '+2' },
		{ id: 'CET', label: 'Central European Time', location: 'Europe', offset: '+1' },
		{ id: 'CHADT', label: 'Chatham Island Daylight Time', location: 'Pacific', offset: '+13:45' },
		{ id: 'CHAST', label: 'Chatham Island Standard Time', location: 'Pacific', offset: '+12:45' },
		{ id: 'CHOST', label: 'Choibalsan Summer Time', location: 'Asia', offset: '+9' },
		{ id: 'CHOT', label: 'Choibalsan Time', location: 'Asia', offset: '+8' },
		{ id: 'CHUT', label: 'Chuuk Time', location: 'Pacific', offset: '+10' },
		{ id: 'CIDST', label: 'Cayman Islands Daylight Saving Time', location: 'Caribbean', offset: '-4' },
		{ id: 'CIST', label: 'Cayman Islands Standard Time', location: 'Caribbean', offset: '-5' },
		{ id: 'CKT', label: 'Cook Island Time', location: 'Pacific', offset: '-10' },
		{ id: 'CLST', label: 'Chile Summer Time', location: 'South America', offset: '-3' },
		{ id: 'CLT', label: 'Chile Standard Time', location: 'South America', offset: '-4' },
		{ id: 'COT', label: 'Colombia Time', location: 'South America', offset: '-5' },
		{ id: 'CST', label: 'Central Standard Time', location: 'North America', offset: '-6' },
		{ id: 'CST', label: 'China Standard Time', location: 'Asia', offset: '+8' },
		{ id: 'CST', label: 'Cuba Standard Time', location: 'Caribbean', offset: '-5' },
		{ id: 'CT', label: 'Central Time', location: 'North America', offset: '-6:00' },
		{ id: 'CVT', label: 'Cape Verde Time', location: 'Africa', offset: '-1' },
		{ id: 'CXT', label: 'Christmas Island Time', location: 'Australia', offset: '+7' },
		{ id: 'ChST', label: 'Chamorro Standard Time', location: 'Pacific', offset: '+10' },
		{ id: 'D', label: 'Delta Time Zone', location: 'Military', offset: '+4' },
		{ id: 'DAVT', label: 'Davis Time', location: 'Antarctica', offset: '+7' },
		{ id: 'DDUT', label: 'Dumont-d\'Urville Time', location: 'Antarctica', offset: '+10' },
		{ id: 'E', label: 'Echo Time Zone', location: 'Military', offset: '+5' },
		{ id: 'EASST', label: 'Easter Island Summer Time', location: 'Pacific', offset: '-5' },
		{ id: 'EAST', label: 'Easter Island Standard Time', location: 'Pacific', offset: '-6' },
		{ id: 'EAT', label: 'Eastern Africa Time', location: 'Africa', offset: '+3' },
		{ id: 'ECT', label: 'Ecuador Time', location: 'South America', offset: '-5' },
		{ id: 'EDT', label: 'Eastern Daylight Time', location: 'North America', offset: '-4' },
		{ id: 'EEST', label: 'Eastern European Summer Time', location: 'Europe', offset: '+3' },
		{ id: 'EET', label: 'Eastern European Time', location: 'Europe', offset: '+2' },
		{ id: 'EGST', label: 'Eastern Greenland Summer Time', location: 'North America', offset: '+0' },
		{ id: 'EGT', label: 'East Greenland Time', location: 'North America', offset: '-1' },
		{ id: 'EST', label: 'Eastern Standard Time', location: 'North America', offset: '-5' },
		{ id: 'ET', label: 'Eastern Time', location: 'North America', offset: '-5:00' },
		{ id: 'F', label: 'Foxtrot Time Zone', location: 'Military', offset: '+6' },
		{ id: 'FET', label: 'Further-Eastern European Time', location: 'Europe', offset: '+3' },
		{ id: 'FJST', label: 'Fiji Summer Time', location: 'Pacific', offset: '+13' },
		{ id: 'FJT', label: 'Fiji Time', location: 'Pacific', offset: '+12' },
		{ id: 'FKST', label: 'Falkland Islands Summer Time', location: 'South America', offset: '-3' },
		{ id: 'FKT', label: 'Falkland Island Time', location: 'South America', offset: '-4' },
		{ id: 'FNT', label: 'Fernando de Noronha Time', location: 'South America', offset: '-2' },
		{ id: 'G', label: 'Golf Time Zone', location: 'Military', offset: '+7' },
		{ id: 'GALT', label: 'Galapagos Time', location: 'Pacific', offset: '-6' },
		{ id: 'GAMT', label: 'Gambier Time', location: 'Pacific', offset: '-9' },
		{ id: 'GET', label: 'Georgia Standard Time', location: 'Asia', offset: '+4' },
		{ id: 'GFT', label: 'French Guiana Time', location: 'South America', offset: '-3' },
		{ id: 'GILT', label: 'Gilbert Island Time', location: 'Pacific', offset: '+12' },
		{ id: 'GMT', label: 'Greenwich Mean Time', location: 'Europe', offset: '+0' },
		{ id: 'GST', label: 'Gulf Standard Time', location: 'Asia', offset: '+4' },
		{ id: 'GST', label: 'South Georgia Time', location: 'South America', offset: '-2' },
		{ id: 'GYT', label: 'Guyana Time', location: 'South America', offset: '-4' },
		{ id: 'H', label: 'Hotel Time Zone', location: 'Military', offset: '+8' },
		{ id: 'HDT', label: 'Hawaii-Aleutian Daylight Time', location: 'North America', offset: '-9' },
		{ id: 'HKT', label: 'Hong Kong Time', location: 'Asia', offset: '+8' },
		{ id: 'HOVST', label: 'Hovd Summer Time', location: 'Asia', offset: '+8' },
		{ id: 'HOVT', label: 'Hovd Time', location: 'Asia', offset: '+7' },
		{ id: 'HST', label: 'Hawaii Standard Time', location: 'North America', offset: '-10' },
		{ id: 'I', label: 'India Time Zone', location: 'Military', offset: '+9' },
		{ id: 'ICT', label: 'Indochina Time', location: 'Asia', offset: '+7' },
		{ id: 'IDT', label: 'Israel Daylight Time', location: 'Asia', offset: '+3' },
		{ id: 'IOT', label: 'Indian Chagos Time', location: 'Indian Ocean', offset: '+6' },
		{ id: 'IRDT', label: 'Iran Daylight Time', location: 'Asia', offset: '+4:30' },
		{ id: 'IRKST', label: 'Irkutsk Summer Time', location: 'Asia', offset: '+9' },
		{ id: 'IRKT', label: 'Irkutsk Time', location: 'Asia', offset: '+8' },
		{ id: 'IRST', label: 'Iran Standard Time', location: 'Asia', offset: '+3:30' },
		{ id: 'IST', label: 'India Standard Time', location: 'Asia', offset: '+5:30' },
		{ id: 'IST', label: 'Irish Standard Time', location: 'Europe', offset: '+1' },
		{ id: 'IST', label: 'Israel Standard Time', location: 'Asia', offset: '+2' },
		{ id: 'JST', label: 'Japan Standard Time', location: 'Asia', offset: '+9' },
		{ id: 'K', label: 'Kilo Time Zone', location: 'Military', offset: '+10' },
		{ id: 'KGT', label: 'Kyrgyzstan Time', location: 'Asia', offset: '+6' },
		{ id: 'KOST', label: 'Kosrae Time', location: 'Pacific', offset: '+11' },
		{ id: 'KRAST', label: 'Krasnoyarsk Summer Time', location: 'Asia', offset: '+8' },
		{ id: 'KRAT', label: 'Krasnoyarsk Time', location: 'Asia', offset: '+7' },
		{ id: 'KST', label: 'Korea Standard Time', location: 'Asia', offset: '+9' },
		{ id: 'KUYT', label: 'Kuybyshev Time', location: 'Europe', offset: '+4' },
		{ id: 'L', label: 'Lima Time Zone', location: 'Military', offset: '+11' },
		{ id: 'LHDT', label: 'Lord Howe Daylight Time', location: 'Australia', offset: '+11' },
		{ id: 'LHST', label: 'Lord Howe Standard Time', location: 'Australia', offset: '+10:30' },
		{ id: 'LINT', label: 'Line Islands Time', location: 'Pacific', offset: '+14' },
		{ id: 'M', label: 'Mike Time Zone', location: 'Military', offset: '+12' },
		{ id: 'MAGST', label: 'Magadan Summer Time', location: 'Asia', offset: '+12' },
		{ id: 'MAGT', label: 'Magadan Time', location: 'Asia', offset: '+11' },
		{ id: 'MART', label: 'Marquesas Time', location: 'Pacific', offset: '-9:30' },
		{ id: 'MAWT', label: 'Mawson Time', location: 'Antarctica', offset: '+5' },
		{ id: 'MDT', label: 'Mountain Daylight Time', location: 'North America', offset: '-6' },
		{ id: 'MHT', label: 'Marshall Islands Time', location: 'Pacific', offset: '+12' },
		{ id: 'MMT', label: 'Myanmar Time', location: 'Asia', offset: '+6:30' },
		{ id: 'MSD', label: 'Moscow Daylight Time', location: 'Europe', offset: '+4' },
		{ id: 'MSK', label: 'Moscow Standard Time', location: 'Europe', offset: '+3' },
		{ id: 'MST', label: 'Mountain Standard Time', location: 'North America', offset: '-7' },
		{ id: 'MT', label: 'Mountain Time', location: 'North America', offset: '-7:00' },
		{ id: 'MUT', label: 'Mauritius Time', location: 'Africa', offset: '+4' },
		{ id: 'MVT', label: 'Maldives Time', location: 'Asia', offset: '+5' },
		{ id: 'MYT', label: 'Malaysia Time', location: 'Asia', offset: '+8' },
		{ id: 'N', label: 'November Time Zone', location: 'Military', offset: '-1' },
		{ id: 'NCT', label: 'New Caledonia Time', location: 'Pacific', offset: '+11' },
		{ id: 'NDT', label: 'Newfoundland Daylight Time', location: 'North America', offset: '-2:30' },
		{ id: 'NFDT', label: 'Norfolk Daylight Time', location: 'Australia', offset: '+12' },
		{ id: 'NFT', label: 'Norfolk Time', location: 'Australia', offset: '+11' },
		{ id: 'NOVST', label: 'Novosibirsk Summer Time', location: 'Asia', offset: '+7' },
		{ id: 'NOVT', label: 'Novosibirsk Time', location: 'Asia', offset: '+7' },
		{ id: 'NPT', label: 'Nepal Time', location: 'Asia', offset: '+5:45' },
		{ id: 'NRT', label: 'Nauru Time', location: 'Pacific', offset: '+12' },
		{ id: 'NST', label: 'Newfoundland Standard Time', location: 'North America', offset: '-3:30' },
		{ id: 'NUT', label: 'Niue Time', location: 'Pacific', offset: '-11' },
		{ id: 'NZDT', label: 'New Zealand Daylight Time', location: 'Pacific', offset: '+13' },
		{ id: 'NZST', label: 'New Zealand Standard Time', location: 'Pacific', offset: '+12' },
		{ id: 'O', label: 'Oscar Time Zone', location: 'Military', offset: '-2' },
		{ id: 'OMSST', label: 'Omsk Summer Time', location: 'Asia', offset: '+7' },
		{ id: 'OMST', label: 'Omsk Standard Time', location: 'Asia', offset: '+6' },
		{ id: 'ORAT', label: 'Oral Time', location: 'Asia', offset: '+5' },
		{ id: 'P', label: 'Papa Time Zone', location: 'Military', offset: '-3' },
		{ id: 'PDT', label: 'Pacific Daylight Time', location: 'North America', offset: '-7' },
		{ id: 'PET', label: 'Peru Time', location: 'South America', offset: '-5' },
		{ id: 'PETST', label: 'Kamchatka Summer Time', location: 'Asia', offset: '+12' },
		{ id: 'PETT', label: 'Kamchatka Time', location: 'Asia', offset: '+12' },
		{ id: 'PGT', label: 'Papua New Guinea Time', location: 'Pacific', offset: '+10' },
		{ id: 'PHOT', label: 'Phoenix Island Time', location: 'Pacific', offset: '+13' },
		{ id: 'PHT', label: 'Philippine Time', location: 'Asia', offset: '+8' },
		{ id: 'PKT', label: 'Pakistan Standard Time', location: 'Asia', offset: '+5' },
		{ id: 'PMDT', label: 'Pierre & Miquelon Daylight Time', location: 'North America', offset: '-2' },
		{ id: 'PMST', label: 'Pierre & Miquelon Standard Time', location: 'North America', offset: '-3' },
		{ id: 'PONT', label: 'Pohnpei Standard Time', location: 'Pacific', offset: '+11' },
		{ id: 'PST', label: 'Pacific Standard Time', location: 'North America', offset: '-8' },
		{ id: 'PST', label: 'Pitcairn Standard Time', location: 'Pacific', offset: '-8' },
		{ id: 'PT', label: 'Pacific Time', location: 'North America', offset: '-8:00' },
		{ id: 'PWT', label: 'Palau Time', location: 'Pacific', offset: '+9' },
		{ id: 'PYST', label: 'Paraguay Summer Time', location: 'South America', offset: '-3' },
		{ id: 'PYT', label: 'Paraguay Time', location: 'South America', offset: '-4' },
		{ id: 'PYT', label: 'Pyongyang Time', location: 'Asia', offset: '+8:30' },
		{ id: 'Q', label: 'Quebec Time Zone', location: 'Military', offset: '-4' },
		{ id: 'QYZT', label: 'Qyzylorda Time', location: 'Asia', offset: '+6' },
		{ id: 'R', label: 'Romeo Time Zone', location: 'Military', offset: '-5' },
		{ id: 'RET', label: 'Reunion Time', location: 'Africa', offset: '+4' },
		{ id: 'ROTT', label: 'Rothera Time', location: 'Antarctica', offset: '-3' },
		{ id: 'S', label: 'Sierra Time Zone', location: 'Military', offset: '-6' },
		{ id: 'SAKT', label: 'Sakhalin Time', location: 'Asia', offset: '+11' },
		{ id: 'SAMT', label: 'Samara Time', location: 'Europe', offset: '+4' },
		{ id: 'SAST', label: 'South Africa Standard Time', location: 'Africa', offset: '+2' },
		{ id: 'SBT', label: 'Solomon Islands Time', location: 'Pacific', offset: '+11' },
		{ id: 'SCT', label: 'Seychelles Time', location: 'Africa', offset: '+4' },
		{ id: 'SGT', label: 'Singapore Time', location: 'Asia', offset: '+8' },
		{ id: 'SRET', label: 'Srednekolymsk Time', location: 'Asia', offset: '+11' },
		{ id: 'SRT', label: 'Suriname Time', location: 'South America', offset: '-3' },
		{ id: 'SST', label: 'Samoa Standard Time', location: 'Pacific', offset: '-11' },
		{ id: 'SYOT', label: 'Syowa Time', location: 'Antarctica', offset: '+3' },
		{ id: 'T', label: 'Tango Time Zone', location: 'Military', offset: '-7' },
		{ id: 'TAHT', label: 'Tahiti Time', location: 'Pacific', offset: '-10' },
		{ id: 'TFT', label: 'French Southern and Antarctic Time', location: 'Indian Ocean', offset: '+5' },
		{ id: 'TJT', label: 'Tajikistan Time', location: 'Asia', offset: '+5' },
		{ id: 'TKT', label: 'Tokelau Time', location: 'Pacific', offset: '+13' },
		{ id: 'TLT', label: 'East Timor Time', location: 'Asia', offset: '+9' },
		{ id: 'TMT', label: 'Turkmenistan Time', location: 'Asia', offset: '+5' },
		{ id: 'TOST', label: 'Tonga Summer Time', location: 'Pacific', offset: '+14' },
		{ id: 'TOT', label: 'Tonga Time', location: 'Pacific', offset: '+13' },
		{ id: 'TRT', label: 'Turkey Time', location: 'Asia', offset: '+3' },
		{ id: 'TVT', label: 'Tuvalu Time', location: 'Pacific', offset: '+12' },
		{ id: 'U', label: 'Uniform Time Zone', location: 'Military', offset: '-8' },
		{ id: 'ULAST', label: 'Ulaanbaatar Summer Time', location: 'Asia', offset: '+9' },
		{ id: 'ULAT', label: 'Ulaanbaatar Time', location: 'Asia', offset: '+8' },
		{ id: 'UTC', label: 'Coordinated Universal Time', location: 'Worldwide', offset: 'UTC' },
		{ id: 'UYST', label: 'Uruguay Summer Time', location: 'South America', offset: '-2' },
		{ id: 'UYT', label: 'Uruguay Time', location: 'South America', offset: '-3' },
		{ id: 'UZT', label: 'Uzbekistan Time', location: 'Asia', offset: '+5' },
		{ id: 'V', label: 'Victor Time Zone', location: 'Military', offset: '-9' },
		{ id: 'VET', label: 'Venezuelan Standard Time', location: 'South America', offset: '-4' },
		{ id: 'VLAST', label: 'Vladivostok Summer Time', location: 'Asia', offset: '+11' },
		{ id: 'VLAT', label: 'Vladivostok Time', location: 'Asia', offset: '+10' },
		{ id: 'VOST', label: 'Vostok Time', location: 'Antarctica', offset: '+6' },
		{ id: 'VUT', label: 'Vanuatu Time', location: 'Pacific', offset: '+11' },
		{ id: 'W', label: 'Whiskey Time Zone', location: 'Military', offset: '-10' },
		{ id: 'WAKT', label: 'Wake Time', location: 'Pacific', offset: '+12' },
		{ id: 'WARST', label: 'Western Argentine Summer Time', location: 'South America', offset: '-3' },
		{ id: 'WAST', label: 'West Africa Summer Time', location: 'Africa', offset: '+2' },
		{ id: 'WAT', label: 'West Africa Time', location: 'Africa', offset: '+1' },
		{ id: 'WEST', label: 'Western European Summer Time', location: 'Europe', offset: '+1' },
		{ id: 'WET', label: 'Western European Time', location: 'Europe Africa', offset: '+0' },
		{ id: 'WFT', label: 'Wallis and Futuna Time', location: 'Pacific', offset: '+12' },
		{ id: 'WGST', label: 'Western Greenland Summer Time', location: 'North America', offset: '-2' },
		{ id: 'WGT', label: 'West Greenland Time', location: 'North America', offset: '-3' },
		{ id: 'WIB', label: 'Western Indonesian Time', location: 'Asia', offset: '+7' },
		{ id: 'WIT', label: 'Eastern Indonesian Time', location: 'Asia', offset: '+9' },
		{ id: 'WITA', label: 'Central Indonesian Time', location: 'Asia', offset: '+8' },
		{ id: 'WST', label: 'West Samoa Time', location: 'Pacific', offset: '+13' },
		{ id: 'WST', label: 'Western Sahara Summer Time', location: 'Africa', offset: '+1' },
		{ id: 'WT', label: 'Western Sahara Standard Time', location: 'Africa', offset: '+0' },
		{ id: 'X', label: 'X-ray Time Zone', location: 'Military', offset: '-11' },
		{ id: 'Y', label: 'Yankee Time Zone', location: 'Military', offset: '-12' },
		{ id: 'YAKST', label: 'Yakutsk Summer Time', location: 'Asia', offset: '+10' },
		{ id: 'YAKT', label: 'Yakutsk Time', location: 'Asia', offset: '+9' },
		{ id: 'YAPT', label: 'Yap Time', location: 'Pacific', offset: '+10' },
		{ id: 'YEKST', label: 'Yekaterinburg Summer Time', location: 'Asia', offset: '+6' },
		{ id: 'YEKT', label: 'Yekaterinburg Time', location: 'Asia', offset: '+5' },
		{ id: 'Z', label: 'Zulu Time Zone', location: 'Military', offset: '+0' },
	]
}