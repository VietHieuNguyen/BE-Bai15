const User = require("../../models/user.model")

const userSocket = require("../../socket/client/user.socket")
//[GET] /users/not-friend
module.exports.notFriend = async (req, res)=>{
  //Socket
    userSocket(res);
  //end socket


  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id:userId
  })
  const requestFriends = myUser.requestFriends;
  const acceptFriends = myUser.acceptFriends;
  const users = await User.find({
    $and:[
      {_id: {$ne: userId}},
      {_id: {$nin: requestFriends}},
      {_id: {$nin: acceptFriends}}
    ],
    
    
    status: "active",
    deleted: false
  }).select("id avatar fullName")

  res.render("client/pages/users/not-friend",{
    pageTitle: "Trang kết bạn",
    users: users
  })
}

//[GET] /users/request
module.exports.request = async (req, res)=>{
  //Socket
    userSocket(res);
  //end socket


  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id:userId
  })
  const requestFriends = myUser.requestFriends;
  const users = await User.find({
    _id: {$in: requestFriends},
    
    status: "active",
    deleted: false
  }).select("id avatar fullName")
  res.render("client/pages/users/request",{
    pageTitle: "Trang lời mời đã gửi",
    users: users
  })
}