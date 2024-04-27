export default function createErr(statusCode, message, errId = null) {
    const err = new Error(message);
    if (errId) err.id = errId;
    err.statusCode = statusCode
    console.log(`🆔 Error ID: ${errId} ↔ \n🔴 message: ${message}`.red);
    return err;
};