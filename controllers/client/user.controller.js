const User = require("../../models/user.model");
const md5 = require("md5");
const genareHelper = require("../../helpers/generate")
const ForgotPassword = require("../../models/forgot-password.model")
// [GET] /user/register
module.exports.register = (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Trang đăng ký",
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const redirectUrl = req.get("Referer");
  const existEmail = await User.findOne({
    email: req.body.email,
  });
  if (existEmail) {
    req.flash("error", "Email đã tồn tại");
    res.redirectUrl(redirectUrl);
    return;
  }
  req.body.password = md5(req.body.password);

  const user = new User(req.body);
  await user.save();

  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};

// [GET] /user/login
module.exports.login = (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Trang đăng nhập",
  });
};

// [GET] /user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const redirectUrl = req.get("Referer");
  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    res.flash("error", "Email không tồn tại");
    res.redirect(redirectUrl);
    return;
  }
  if (md5(password) != user.password) {
    res.flash("error", "Sai mật khẩu");
    res.redirect(redirectUrl);
    return;
  }
  if (user.status === "inactive") {
    res.flash("error", "Tài khoản đã bị khóa");
    res.redirect(redirectUrl);
    return;
  }
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};

// [GET] /user/logout
module.exports.logout = (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/");
};

// [GET] /user/password/forgot
module.exports.forgotPassword = (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Lấy lại mật khẩu",
  });
};

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;
  const redirectUrl = req.get("Referer")
  const user = await User.findOne({
    email: email,
    deleted: false
  })
  if(!user){
    req.flash("error","Email không tồn tại");
    res.redirect(redirectUrl)
    return
  }
  //Lưu thông tin vào db
  const otp = genareHelper.generateRandomNumber(8);
  const objectForgotPassword =
  {
    email: email,
    opt: otp,
    expireAt: Date.now(),
  }
  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();
  // Nếu tồn tại email thì gửi otp qua email



};