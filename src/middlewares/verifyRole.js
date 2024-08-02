const { verify } = require("../utils/jwt")
const { fetchData } = require("../utils/postgres")

const verifyRole = (...roles) => {
    return async (req, res, next) => {
        let { token } = req.headers
        if (!token) {
            res.status(403).send({
                success: false,
                message: "Can you send token !"
            })
            return
        }
        let { id } = verify(token)
        let [user] = await fetchData("select * from users where id = $1", id)
        if (user) {
            if (roles.find(el => el == user.role)) {
                req.userId = user.id
                next()
            } else {
                res.status(403).send({
                    success: false,
                    message: "damini ol"
                })
            }
        } else {
            res.status(403).send({
                success: false,
                message: "token xato"
            })
        }
    }
}

module.exports = verifyRole
