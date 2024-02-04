const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).send({
                msg: "No Token Provided",
                success: false,
                data: null
            });
        }
        const decoded = jwt.verify(token, process.env.jwt_secret); 
        req.body.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).send({
            message: "Auth ",
            success: false,
        });
    }
};