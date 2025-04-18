const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
    try{
        const authToken = req.cookies.authToken;
    if(!authToken) {
        return res.status(401).send("Session expired. Please login again.");
    }
    const decoded = jwt.verify(authToken,"Faz@123");
    const user = await User.findById(decoded._id);
    if(!user) {
        return res.status(401).send("User not found. Please login.");
    }
    //Attach the user to the request object
    req.user = user;
    next();
    }catch (error) {
        return res.status(401).send("Authization failed: "+ error.message);
    }
}
module.exports = auth;