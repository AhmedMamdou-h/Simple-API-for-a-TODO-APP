const Todo = require("../models/todosmodel")


const getAlltodos = async (req, res) => {
    const query = req.query;
    const limit = query.limit
    const page = query.page
    const skip = (page - 1) * limit




   const todos = await Todo.find({},{"__v":false}).limit(limit).skip(skip);
    res.json({status:"success",data: todos});
}

//get all the done tdos
/*const getAlltodos = async (req, res) => {
    const todos = await Todo.find({"status":"done"})
     res.json({status:"success",data: todos});
 }*/









const getTodo =async (req, res) => {
   /* const todoId = +req.params.todoId;
    const todo = todos.find(todo => todo.id === todoId);*/
 try{
    const todo = await Todo.findById(req.params.todoId)
    if (!todo) {
      return  res.status(404).json({ msg: "Todo not found" });
    }
    res.json({status:"success",data: todo})
} catch(err){res.status(400).json({ msg: "invalid id" })}  
};



const createTodo = async (req, res) => {

    const newTodo = new Todo(req.body) ;
   await newTodo.save()
    .then(todo => res.json({status:"success",data: todo}))
    .catch(err => res.status(400).json("Error: " + err))
    }
    /*newTodo.id = todos.length + 1;
    // todos.push(newTodo);
    res.status(201).json(newTodo);
}*/

const updateTodo =async (req,res)=>{
    const todoId = req.params.todoId;
   /* const todo = todos.find(todo => todo.id === todoId);*/
        try{
            const updatedtodo = await Todo.updateOne({_id:todoId},{$set:{...req.body}})
            if (!updateTodo) {
                return  res.status(404).json({ msg: "Todo not found" });
                }
                res.json({status:"success",data: updateTodo})
                } catch(err){res.status(400).json({ msg: "invalid id" })}
                }

    
    /*if (!todo) {
      return  res.status(404).json({ msg: "Todo not found" });
        }
        const updatedTodo = req.body;
        Object.assign(todo, updatedTodo);
        res.json(todo);*/


const deleteTodo = async(req, res) => {
   /* const todoId = +req.params.todoId;
    const todo = todos.find(todo => todo.id === todoId);*/

    try{
        const deletedTodo = await Todo.deleteOne({_id:req.params.todoId})
        if (!deletedTodo) {
            return  res.status(404).json({ msg: "Todo not found" });
            }
            res.json({status:"success",data: null})
            } catch(err){res.status(400).json({ msg: "invalid id" })}
            }
            
    /*if (!todo) {
        res.status(404).json({ msg: "Todo not found" });
    }
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    res.json(todo);
}*/

module.exports= {
    getAlltodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}

