import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import path from 'path'

const storageTypes = {
  local: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`

      cb(null, filename);
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'dynamusdev-upload',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: string) => void) => {
      const filename = `${Date.now()}-${file.originalname.replace(' ', '')}`

      cb(null, filename);
    }
  }),
};

export default {
  dest: path.join(__dirname, '..', '..', 'uploads'),
  storage: storageTypes['s3'],
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req: any, file: any, cb: any) => {
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
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  }
};