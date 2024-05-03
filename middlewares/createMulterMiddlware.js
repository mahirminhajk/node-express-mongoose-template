import multer from 'multer'

const memoryStorage = multer.memoryStorage();
const serverStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

export const memoryUploadMiddleware = multer({ storage: memoryStorage });
export const serverUploadMiddleware = multer({ storage: serverStorage });