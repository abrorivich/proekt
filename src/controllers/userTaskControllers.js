const { fetchData } = require("../utils/postgres")

const createUserTask = async (req, res) => {
    try {
        let { user_id, task_id, status } = req.body
        fetchData("insert into user_tasks (user_id, task_id, status) values ($1, $2, $3)", user_id, task_id, status)
        res.send({
            success: true,
            message: "user_tasks la berildi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const updateUserTask = async (req, res) => {
    try {
        let { user_id, task_id, status, id } = req.body
        let [tasks] = await fetchData("select * from user_tasks where id = $1", id)
        fetchData("update user_tasks set user_id = $1, task_id = $2, status = $3 where id = $4",
            user_id || tasks.user_id, task_id || tasks.task_id, status || tasks.status, id)
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

const deleteUserTask = async (req, res) => {
    try {
        let { id } = req.body
        fetchData("delete from user_tasks where id = $1", id)
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

const ByTaskId  = async (req, res) => {
    try {
        let tasks = await fetchData("select t.id, t.title, t.description, u.user_id, u.task_id, u.start_at from tasks as t inner join user_tasks as u on t.id = u.task_id")
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

const ByUcerId  = async (req, res) => {
    try {
        let tasks = await fetchData("select us.id, us.login, us.password, u.user_id, u.task_id, u.start_at from users as us inner join user_tasks as u on us.id = u.user_id;")
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

const ByOneId  = async (req, res) => {
    try {
        let { id } = req.body
        let tasks = await fetchData("select us.id, us.login, us.password, t.title, u.start_at  from users as us inner join user_tasks as u on us.id = u.user_id inner join tasks as t on t.id = u.task_id where us.id = $1", id)
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
    createUserTask,
    updateUserTask,
    deleteUserTask,
    ByTaskId,
    ByUcerId,
    ByOneId
}
