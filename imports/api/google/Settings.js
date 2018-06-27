const key = require('./taxiapp-60d0eb253959.json').private_key;


const SERVICE_ACCT_ID = 'taxiapp@taxiapp-200711.iam.gserviceaccount.com';
const CALENDAR_URL = 'https://calendar.google.com/calendar/b/2?cid=aW5mby50aGlqbS5lY3NAZ21haWwuY29t';
const CALENDAR_ID = {
	'primary': 'info.thijm.ecs@gmail.com'
};
const TIMEZONE = 'GMT+02:00';

module.exports.calendarUrl = CALENDAR_URL;
module.exports.serviceAcctId = SERVICE_ACCT_ID;
module.exports.calendarId = CALENDAR_ID;
module.exports.key = key;
module.exports.timezone = TIMEZONE;