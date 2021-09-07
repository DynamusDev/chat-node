"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const path_1 = __importDefault(require("path"));
const storageTypes = {
    local: multer_1.default.diskStorage({
        destination: path_1.default.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null, filename);
        }
    }),
    s3: multer_s3_1.default({
        s3: new aws_sdk_1.default.S3(),
        bucket: 'dynamusdev-upload',
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname.replace(' ', '')}`;
            cb(null, filename);
        }
    }),
};
exports.default = {
    dest: path_1.default.join(__dirname, '..', '..', 'uploads'),
    storage: storageTypes['s3'],
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/jpg',
            'video/mp4',
            'video/3gp',
            'audio/mp3',
            'audio/AAC',
            'audio/wma',
            'audio/wav',
            'audio/ogg',
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'));
        }
    }
};
