const express = require("express")
const app = express()
const router = express.Router()
const path = require("path")
const morgan = require("morgan")
const fs = require("fs")
const db = require("./db")
const bodyParser = require("body-parser")

const port = 3000

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
app.use(bodyParser.json())

app.use(express.static("assets"))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"))
})

app.get("/api/:word", async (req, res, next) => {
  const word = req.params.word

  if (word === "nouns") {
    await db.getNouns().then(response => res.send(response))
  }
  if (word === "verbs") {
    await db.getVerbs().then(response => res.send(response))
  }

  if (word === "adjectives") {
    await db.getAdjectives().then(response => res.send(response))
  }
})

app.post("/api/:word", async (req, res, next) => {
  const word = req.params.word

  if (word === "nouns") {
    await db.createNoun().then(response => res.send(response))
  }

  if (word === "verbs") {
    await db.createVerb().then(response => res.send(response))
  }

  if (word === "adjectives") {
    await db.createAdjective().then(response => res.send(response))
  }
})

app.delete("/api/:word/:id", async (req, res, next) => {
  const word = req.params.word
  const id = req.params.id

  if (word === "nouns") {
    db.deleteNoun(id).then(() => res.end())
  }
  if (word === "verbs") {
    db.deleteVerb(id).then(() => res.end())
  }
  if (word === "adjectives") {
    db.deleteAdjective(id).then(() => res.end())
  }
})

db.sync()
  .then(() => {
    console.log("db synced")
    app.listen(port, () => console.log(`listening on port ${port}`))
  })
  .catch(ex => console.log(ex))
