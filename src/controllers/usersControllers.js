const { fetchData } = require("../utils/postgres")

const createUser = async (req, res) => {
    try {
        let { login, password, fullname, company_id } = req.body
        fetchData("insert into users(login, password, fullname, company_id, role) values ($1, $2, $3, $4, $5)", login, password, fullname, company_id, "worker")
        res.send({
            success: true,
            message: "worker yaratildi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        let { fullname, login, password, company_id, id } = req.body
        let [user] = await fetchData("select * from users where id = $1", id)
        fetchData("update users set fullname = $1, login = $2, password = $3, company_id = $4 where id = $5",
            fullname || user.fullname, login || user.login, password || user.password, company_id || user.company_id, id)
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

const deleteUser = async (req, res) => {
    try {
        let { id } = req.body
        fetchData("delete from users where id = $1 ", id)
        res.send({
            success: true,
            message: "worker udalit qilindi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const getOneUser = async (req, res) => {
    try {
        let { id } = req.body
        let users = await fetchData("select * from users where id = $1", id)
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

const getAllUser = async (req, res) => {
    try {
        let { userId } = req
        let [user] = await fetchData("select * from users where id = $1", userId)
        console.log(user.role);
        if (user.role == "admin") {            
            let users = await fetchData("select * from users where role = 'manager'")
            res.send({
                success: true,
                data: users
            })
        } else if (user.role == "manager") {            
            let users = await fetchData("select * from users where role = 'worker'")
            res.send({
                success: true,
                data: users
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUser,
    getOneUser
}
