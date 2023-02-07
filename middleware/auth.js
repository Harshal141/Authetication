const jwt = require('jsonwebtoken');

// acessing jwt secret from default.json
const fs = require('fs');
var global_data = fs.readFileSync("default.json");
global_data = JSON.parse(global_data);

module.exports = function(req,res,next) {
    // get token from header
    const token = req.header['x-auth-token'];

    // check if not token
    if(!token){
        return res.redirect('/login');
    }
     
    // verify token
    try{
        const decoded = jwt.verify(token, global_data['jwtSecret']);
        req.user = decoded.user;
        next();
    }catch(err){
        res.redirect('/login');
    }
}