import express from "express"
import morgan from "morgan"
import http from "http"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(morgan("tiny"))

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("message", (body) => {
        console.log(body)
        socket.broadcast.emit("message", {
            body,
            from: socket.id.slice(0, 6)
        })
    })
})

server.listen(3000)
