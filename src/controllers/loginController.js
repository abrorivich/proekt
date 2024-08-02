const { sign } = require("../utils/jwt")
const { fetchData } = require("../utils/postgres")

const login = async (req, res) => {
    let { login, password } = req.body
    let [users] = await fetchData("select * from users where login = $1 and password = $2", login, password)
    if (users) {
        let token = sign({ id: users.id })
        res.send({
            success: true,
            role: users.role,
            token: token
        })
    } else {
        res.status(404).json({
            success: false,
            mesasge: "Login yoki parol xato"
        })
    }
}

module.exports = {
    login
}