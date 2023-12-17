var express = require('express');
var router = express.Router();
const userModel =require("./users")
const passport=require('passport'); //require passport
const localstratergy =require("passport-local");// this makes user login stratergy
const upload = require("./multer")


passport.use(new localstratergy(userModel.authenticate()))
router.get('/', function(req, res) {
  res.render('index', {footer: false});
});

router.get('/login', function(req, res) {
  res.render('login', {footer: false});
});

router.get('/feed',isLogedin, function(req, res) {
  res.render('feed', {footer: true});
});

router.get('/profile',isLogedin,async function(req, res) {
  //below line finds the current user who is logged in 
  const user =await userModel.findOne({username: req.session.passport.user});
  res.render('profile', {footer: true,user});
});

router.get('/search',isLogedin, function(req, res) {
  res.render('search', {footer: true});
});

router.get('/edit',isLogedin, async function(req, res) {
  const user =await userModel.findOne({username: req.session.passport.user});
  res.render('edit', {footer: true, user});
});

router.get('/upload',isLogedin, function(req, res) {
  res.render('upload', {footer: true});
});

//code for register and login logout starts
//register start
router.post("/register",
function(req,res,next){
  const userData =new userModel({
    username:req.body.username,
    name:req.body.name,
    email:req.body.email,
  })

userModel.register(userData,req.body.password)
.then(function(){
  passport.authenticate("local")(req,res,function(){
    res.redirect("/profile");
  })
})
})
//register end

//login start
router.post('/login',passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/login"
}),function(req, res) {
});
//login ends

//logout starts 
router.get('/logout',function(req, res,next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
//logout ends

// isLogedin- function code start
//now whereever i use this function, it becomes protected route.
function isLogedin(req,res,next){
  if(req.isAuthenticated()) 
  return next();
res.redirect("/login")
}
// isLogedin- function code ends
 

//'update' route start
router.post("/update",upload.single('image'),async function(req,res){
const user =await userModel.findOneAndUpdate(
  // these line will update username,name,bio
  {username: req.session.passport.user},
  {username:req.body.username,
     name:req.body.name,
    bio:req.body.bio},
  {new:true}
  );
  user.profileImage =req.file.filename; // thees lines will update profile pic
  await user.save();
  res.redirect("./profile")
})





module.exports = router;
