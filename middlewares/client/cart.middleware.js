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
    const cart = await Cart.findOne({
      _id: req.cookies.cartId,
    });
      cart.totalQuantity = cart.products.reduce(
      (sum, item) => sum + item.quantity, 0);
      res.locals.miniCart = cart;
  }
  next();
};
