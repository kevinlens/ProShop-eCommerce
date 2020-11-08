import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
  //'cb' means callback, 'null' bc theres no error
  //'req' is the data sent by user and 'file' is the file sent by user
  destination(req, file, cb) {
    //'uploads/' is where we are sending the user's upload to
    cb(null, 'uploads/');
  },
  //customize the inputed file's name (has to be unique)
  filename(req, file, cb) {
    //'${path.extname(file.originalname)}' is the extension name like 'jpg' or 'png'
    //so result should be (pic1name)+(date)+(.png)
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//-----------------
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  //extension name is like '.png'
  //if the extension name of 'file' passed in, matches with preset 'filetypes', it will return true
  //note: path.extname() is its own default special function
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //every file has a mimetype so like pic1/jpeg, so by default you just do this
  //making sure the file has to have one of these /jpg|jpeg|png/;
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}
//-----------------

const upload = multer({
  storage,
  filerFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

//

//

//

router.post('/', upload.single('image'), (req, res) => {
  //gives us our path
  res.send(`/${req.file.path}`);
});

export default router;
