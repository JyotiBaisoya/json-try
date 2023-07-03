const jsonServer = require("json-server");
const fs = require("fs");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middleware = jsonServer.defaults();
const bodyParser = require("body-parser");


server.use(bodyParser.json());
server.use(middleware);


server.post("/register",(req,res)=>{
    const {name,age,place,batch,profession} = req.body;
    fs.readFile("db.json",(err,data)=>{
        if(err){
            res.send("Something went wrong please try again later");
            return
        }

         data = JSON.parse(data.toString());
        let last_id = data.users[data.users.length-1].id;
        data.users.push({id:last_id+1,name,age,place,batch,profession})

        let writedata = fs.writeFile("./db.json",JSON.stringify(data),(err,result)=>{
            if(err){
                res.send("something went wrong")
            }else{
                res.send("added succcessfully")
            }
        })
    })
});


server.get("/alluser",(req,res)=>{
    fs.readFile("./db.json",(err,data)=>{
        if(err){
            res.send("something went wrong");

        }
         data = JSON.parse(data.toString())
        res.send(data)
    })
})

server.use(router)

server.listen(8080,()=>{
    console.log("running on port 8080")
})