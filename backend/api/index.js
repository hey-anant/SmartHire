require("dotenv").config()

const app = require("../src/app")
const connectToDB = require("../src/config/database")

const databaseConnection = connectToDB()

module.exports = async (req, res) => {
    await databaseConnection
    return app(req, res)
}