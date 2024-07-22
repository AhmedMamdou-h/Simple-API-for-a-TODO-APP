const express = require("express");
const cors = require("cors")
const app = express();
const path = require("path")
app.use(cors())
app.use(express.json());
app.use("/uploads",express.static(path.join(__dirname,"/uploads")));

const mongoose = require("mongoose")
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Todo-APP').then(()=>{
    console.log("connected");
  })};


const todosRouter = require("./routes/routes.todos");
const userRouter = require("./routes/user.routes")

app.use("/api/todos", todosRouter);
app.use("/api/users",userRouter)

app.all("*",(req,res,next)=>{
    res.status(404).json({"status":"Failed","message":"Page not found"});
})






















































































app.listen(3001, () => {
    console.log("server is running on port 3001");
})