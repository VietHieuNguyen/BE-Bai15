const Cart = require("../../models/cart.model");
module.exports.cartId = async (req, res, next) => {
  if (!req.cookies.cartId) {
    //Tạo giỏ hàng
    const cart = new Cart();
    await cart.save();
    const expiresCookies = 3655 * 24 * 60 * 60 * 1000;
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresCookies),
    });
  } else {
    //Lấy ra thôi
    
  }
  next();
};
