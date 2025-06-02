export function handleLogin(req, res) {
  const username = req.body.username;
  
  if(username){
    return res.redirect('/chatroom');
  }
  else{
    res.status(400).json({success: false});
  }
}