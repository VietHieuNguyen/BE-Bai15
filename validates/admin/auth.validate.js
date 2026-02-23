module.exports.loginPost = (req,res,next)=>{
  if(!req.body.email){
    req.flash("error","Vui lòng nhập email")
    const redirectUrl =
    req.get("Referrer") || req.app.locals.prefixAdmin + "/products";
    res.redirect(redirectUrl);
    return 
  }
  if(!req.body.password){
    req.flash("error","Vui lòng nhập mật khẩu")
    const redirectUrl =
    req.get("Referrer") || req.app.locals.prefixAdmin + "/products";
    res.redirect(redirectUrl);
    return 
  }
  next();
}


