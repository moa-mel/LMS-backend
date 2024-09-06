const multer = require('multer');


const storage=  multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname+'/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  }
});


module.exports = storage