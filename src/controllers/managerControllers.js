const { fetchData } = require("../utils/postgres")

const getAllManager = async (req, res) => {
    try {
        let users = await fetchData("select * from users where role = 'manager'")
        res.send({
            success: true,
            data: users
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const createManager = async (req, res) => {
    try {
        let { login, password, fullname, company_id } = req.body
        fetchData("insert into users(login, password, fullname, company_id, role) values ($1, $2, $3, $4, $5)", login, password, fullname, company_id, "manager")
        res.send({
            success: true,
            message: "Manager yaratildi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const updateManager = async (req, res) => {
    try {
        let { fullname, login, password, company_id } = req.body
        let { userId } = req
        let [user] = await fetchData("select * from users where id = $1", userId)
        fetchData("update users set fullname = $1, login = $2, password = $3, company_id = $4 where id = $5",
            fullname || user.fullname, login || user.login, password || user.password, company_id || user.company_id, userId)
        res.send({
            success: true,
            message: "Yangilandi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const deleteManager = async (req, res) => {
    try {
        let { id } = req.body
        fetchData("delete from users where id = $1", id)
        res.send({
            success: true,
            message: "Manager udalit qilindi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    getAllManager,
    createManager,
    updateManager,
    deleteManager
}
