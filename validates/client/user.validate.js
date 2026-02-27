module.exports.registerPost = (req,res,next)=>{
  if(!req.body.fullName){
    req.flash("error","Vui lòng nhập họ tên")
    const redirectUrl =
    req.get("Referrer") 
    res.redirect(redirectUrl);
    return 
  }
  if(!req.body.email){
    req.flash("error","Vui lòng nhập email")
    const redirectUrl =
    req.get("Referrer") 
    res.redirect(redirectUrl);
    return 
  }
  if(!req.body.password){
    req.flash("error","Vui lòng nhập mật khẩu")
    const redirectUrl =
    req.get("Referrer") 
    res.redirect(redirectUrl);
    return 
  }
  next();
}



module.exports.loginPost = (req,res,next)=>{
  
  if(!req.body.email){
    req.flash("error","Vui lòng nhập email")
    const redirectUrl =
    req.get("Referrer") 
    res.redirect(redirectUrl);
    return 
  }
  if(!req.body.password){
    req.flash("error","Vui lòng nhập mật khẩu")
    const redirectUrl =
    req.get("Referrer") 
    res.redirect(redirectUrl);
    return 
  }
  next();
}

module.exports.forgotPasswordPost = (req,res,next)=>{
  
  if(!req.body.email){
    req.flash("error","Vui lòng nhập email")
    const redirectUrl =
    req.get("Referrer") 
    res.redirect(redirectUrl);
    return 
  }
  
  next();
}



module.exports.resetPasswordPost = (req,res,next)=>{
  
  if(!req.body.password){
    req.flash("error","Vui lòng nhập mật khẩu")
    const redirectUrl =
    req.get("Referrer") 
    res.redirect(redirectUrl);
    return 
  }
  if(!req.body.confirmPassword){
    req.flash("error","Vui lòng xác nhận mật khẩu")
    const redirectUrl =
    req.get("Referrer") 
    res.redirect(redirectUrl);
    return 
  }
  if(req.body.confirmPassword != req.body.password){
    req.flash("error","Mật khẩu không khớp")
    const redirectUrl =
    req.get("Referrer") 
    res.redirect(redirectUrl);
    return 
  }
  
  
  
  next();
}