// require your server and launch it here
const server = require("./api/server")

server.listen(9000, () => {
    console.log("Server listening at http://localhost:9000")
})