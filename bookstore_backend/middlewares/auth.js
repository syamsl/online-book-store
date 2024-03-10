const admin = require("../firebase");
const User = require("../models/user")

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); // token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);

    // console.log('FIREBASE USERIN AUTHCHECK', firebaseUser)
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user
  const adminUser = await User.findOne({ email }).exec()

if(adminUser){
  if (adminUser.role !== 'admin') {
    res.status(403).json({
      err: "Admin resource. Access denied."
    });
  } else {
    next();
  }
}else{
  next();
}
};

exports.statusCheck = async (req, res, next) => {
  
  const { email } = req.user
  const user = await User.findOne({ email }).exec()

  // console.log();
  // console.log("User status--->", user.status)
  // console.log();
  
  
  if(user){
      if (user.status !== 'active') {
        res.status(401).json({
          err: "User blocked. Access denied"
        });
      }
      else { 
        next();
    }
  }else {
    next();
  }

};

