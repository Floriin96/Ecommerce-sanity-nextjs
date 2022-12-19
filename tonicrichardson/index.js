const express = require("express")
const path = require("path")
const fs = require("fs")
const cors = require("cors")

const PORT = 3333
const distPath = path.resolve(__dirname, "dist")

const app = express()

app.use(cors())

app.get("/admin/*", (req, res, next) => {
  let reqPath = req.path.split("/admin")[1]
  if(req.path[req.path.length-1] === "/") {
    reqPath = reqPath.slice(0, -1)
  }
  let possiblePath = path.join(distPath, reqPath)
  if( fs.existsSync(possiblePath) ) {
    res.sendFile(possiblePath)
  } else {
    next()
  }
})

app.get("*", (req, res) => res.sendFile(path.resolve(distPath, "index.html")))

app.get("*", (req, res) => res.send(req.hostname + "__"  + req.path))

app.listen(PORT, () => console.log("Running in port " + PORT))
