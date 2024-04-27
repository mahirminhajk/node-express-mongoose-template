import moment from 'moment-timezone'

function convertMongooseTimeToRealTime(mongooseTime) {
    // Assumes Mongoose time is stored in UTC
    return moment.utc(mongooseTime).tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss');
}

export { convertMongooseTimeToRealTime };