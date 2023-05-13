const multer = require('multer');

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_TEST_URI
    : process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage: storage });

module.exports = {
  MONGODB_URI,
  PORT,
  upload,
  IS_DEVELOPMENT,
};
