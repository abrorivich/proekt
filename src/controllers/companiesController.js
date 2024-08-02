const { fetchData } = require("../utils/postgres")

const createCompany = async (req, res) => {
    try {
        let { name } = req.body
        fetchData("insert into companies( name ) values ( $1 )", name)
        res.send({
            success: true,
            message: "Companies yaratildi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const getAllCompany = async (req, res) => {
    try {
        let company = await fetchData("select * from companies")
        res.send({
            success: true,
            data: company
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}


const updateCompany = async (req, res) => {
    try {
        let { name, id } = req.body
        fetchData("update companies set name = $1 where id = $2",
            name, id)
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

const deleteCompany = async (req, res) => {
    try {
        let { id } = req.body
        fetchData("delete from companies where id = $1", id)
        res.send({
            success: true,
            message: "Company udalit qilindi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    createCompany,
    getAllCompany,
    updateCompany,
    deleteCompany
}
