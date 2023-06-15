const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        res.status(401).json({ message: 'No token provided' })
        return
    }
    if (auth.split(' ')[0].toLowerCase() !== 'bearer') {
        res.status(401).json({ message: 'Invalid token' })
        return
    }
    const token = auth.split(' ')[1]

    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
        if (err) {
            console.log(err)
            res.status(401).json({ message: 'Invalid token' });
            return
        }
        req.user = decoded;
        next();
    }, null);
}

module.exports = { authentication }