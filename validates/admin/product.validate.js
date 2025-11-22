module.exports.createPost = (req,res,next)=>{
  if(!req.body.title){
    req.flash("error","Vui lòng nhập tiêu đề")
    const redirectUrl =
    req.get("Referrer") || req.app.locals.prefixAdmin + "/products";
  res.redirect(redirectUrl);
    return;
  }
  
  next();
}