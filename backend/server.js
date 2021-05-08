import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// App Config

const app = express();

app.use(cors());
app.use(express.json());

// const port =process.env.PORT || 3001;

// DB Config

const connection_url = "mongodb+srv://mydb1:curio@001@cluster0.lb5l1.mongodb.net/2ndDB?retryWrites=true&w=majority";
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

const userSchema = {
    designation:String,
    glno:Number,
    name:String
}

const appSchema = {
    title:String,
    message:String,
    dt:String,
    gdname: String,
    gno:Number
}



const appModel = mongoose.model("appmodel",appSchema);

const userModel = mongoose.model("usermodel",userSchema);

app.get("/page2", async (req,res)=>{
    appModel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    });
} )

app.post ("/page2", async(req,res)=>{
    const title = req.body.title;
    const message = req.body.message;
    const dt = req.body.dt;
    const gdname=req.body.gdname;
    const gno=req.body.gno;

    

    const newData = new appModel({
        title:title,
        message:message,
        dt:dt,
        gdname:gdname,
        gno:gno
       
        
        
    });
    await newData.save();
    res.send("Success")
})


app.get("/",async(req,res)=>{
    userModel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    } )
})

app.post("/",async (req,res)=>{
     const designation = req.body.designation;
     const glno= req.body.glno;
     const name = req.body.name;
     const newData2 = new userModel ({
        designation:designation,
        glno:glno,
        name:name
     })
     await newData2.save();
     res.send("Sucessfull")
})



// Listener

app.listen(3001,()=>console.log("Server Running on Port 3001"));
