const jwt = require('jsonwebtoken');
function authentication(req,res,next){
    const mainHeader = req.headers.authorization
    // console.log(req.headers.authorization);
    const token = mainHeader && mainHeader.split(' ')[1]//gap between bearrer token - bearrertoken
    // console.log(mainHeader.split(' ')[1]);
    // console.log(mainHeader);
    if (token == null )return res.sendStatus(401)

    jwt.verify(token,'rs',(err,decoded)=>{
        if (err)return res.sendStatus(403);
        req.decoded=decoded;
    })
    next()
}
    module.exports = {
        authentication : authentication
    }