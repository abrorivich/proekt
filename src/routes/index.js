const { Router } = require("express")
const { createManager, getAllManager, updateManager, deleteManager } = require("../controllers/managerControllers")
const { login } = require("../controllers/loginController")
const verifyRole = require("../middlewares/verifyRole")
const verifyToken = require("../middlewares/verifyToken")
const { createCompany, getAllCompany, deleteCompany, updateCompany } = require("../controllers/companiesController")
const { createUser, updateUser, deleteUser, getAllUser, getOneUser } = require("../controllers/usersControllers")
const { createTask, updateTask, deleteTask, getByCompanyId, getOne } = require("../controllers/taskControllers")
const { createUserTask, updateUserTask, deleteUserTask, ByTaskId, ByUcerId, ByOneId } = require("../controllers/userTaskControllers")


const router = Router()

router.post("/login", login)
router.get("/manager/all", verifyRole("admin"), getAllManager)
router.post("/managers/create", verifyRole("admin"), createManager)
router.patch("/managers/update", verifyToken(), verifyRole("manager"), updateManager)
router.delete("/managers/delete", verifyRole("admin"), deleteManager)
router.post("/companies/create", verifyRole("admin"), createCompany)
router.get("/companies/all", verifyRole("admin"), getAllCompany)
router.patch("/companies/update", verifyRole("admin"), updateCompany)
router.delete("/companies/delete", verifyRole("admin"), deleteCompany)
router.post("/users/create", verifyRole("admin", "manager"), createUser)
router.patch("/users/update", verifyRole("admin", "manager"), updateUser)
router.delete("/users/delete", verifyRole("admin", "manager"), deleteUser)
router.get("/users/all", verifyRole("admin", "manager"), getAllUser)
router.get("/users/getOne", verifyRole("admin", "manager"), getOneUser)
router.post("/task/create", verifyRole("manager"), createTask)
router.patch("/task/update", verifyRole("manager"), updateTask)
router.delete("/task/delete", verifyRole("manager"), deleteTask)
router.get("/task/getBy", getByCompanyId)
router.get("/task/getOne", getOne)
router.post("/userTask/create", verifyRole("manager"), createUserTask)
router.patch("/updateUserTask/update", verifyRole("manager"), updateUserTask)
router.delete("/deleteUserTask/delete", verifyRole("manager"), deleteUserTask)
router.get("/ByTaskId/get", ByTaskId)
router.get("/ByUserId/get", ByUcerId)
router.get("/ByOneId/get", ByOneId)




module.exports = router
