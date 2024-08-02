const { fetchData } = require("../utils/postgres")

const createTask = async (req, res) => {
    try {
        let { title, description, company_id } = req.body
        fetchData("insert into tasks (title, description, company_id) values ($1, $2, $3)", title, description, company_id)
        res.send({
            success: true,
            message: "workerlarga tasks berildi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const updateTask = async (req, res) => {
    try {
        let { title, description, company_id, id } = req.body
        let [tasks] = await fetchData("select * from tasks where id = $1", id)
        fetchData("update tasks set title = $1, description = $2, company_id = $3 where id = $4",
            title || tasks.title, description || tasks.description, company_id || tasks.company_id, id)
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

const deleteTask = async (req, res) => {
    try {
        let { id } = req.body
        fetchData("delete from tasks where id = $1", id)
        res.send({
            success: true,
            message: "workerlarga berilgan tasks udalit qilindi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const getByCompanyId = async (req, res) => {
    try {
        let tasks = await fetchData("select * from tasks as t inner join companies as c on t.company_id = c.id")
        res.send({
            success: true,
            data: tasks
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const getOne = async (req, res) => {
    try {
        let { id } = req.body
        let tasks = await fetchData("select * from tasks as t inner join companies as c on t.company_id = c.id where t.id = $1;", id)
        res.send({
            success: true,
            data: tasks
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getByCompanyId,
    getOne
}
