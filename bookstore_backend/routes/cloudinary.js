const express = require("express");
const router = express.Router();

//middlewares
const {authCheck, adminCheck} =  require("../middlewares/auth");
const {upload, remove} = require("../controllers/cloudinary");

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);

router.post("/uploadimageuser", authCheck, upload);
router.post("/removeimageuser", authCheck, remove);

module.exports = router;