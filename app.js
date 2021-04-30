const express=require("express");
const app=express();
const mongoose=require("mongoose");
const multer=require('multer');
const jwt=require("jsonwebtoken");
const nodeLocalstorage=require("node-localstorage");
const path=require("path");
const bodyParser=require("body-parser");
const { response } = require("express");
const port=process.env.PORT||5000;
app.use(bodyParser.urlencoded({extended:true}));
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
app.set("view engine","ejs");
mongoose.connect("mongodb+srv://admin:lf@123Shristi@cluster0.ibnzh.mongodb.net/cruds?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
});
var db=mongoose.connection;
const mongooseSchema=new mongoose.Schema({
    first:{
        type:String,
        required:true
    },
    last:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
});
const empModel = mongoose.model('crud',mongooseSchema);
var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });
  var upload = multer({
    storage:Storage
  }).single('immi');
var employee=empModel.find({})
app.get('/',(req,res,next)=>{
    employee.exec(function(err,data){
        if(err) throw err;
        res.render('index',{title:"cruds",message:"Employees", heading:"add details here",success:"Success",record:data})
    })
});
app.post('/',upload,(req,res,next)=>{
    var empData=new empModel({
        first:req.body.first,
        last:req.body.last,
        message:req.body.message,
        image:req.file.filename
    });
    empData.save(function(err,response){
        if (err) throw err
        employee.exec(function(err,data){
            if(err) throw err;
            res.render('index',{title:"cruds",message:"Employees", heading:"add details here",success:"Success",record:data})
        })
       
    })
})

app.get('/',(req,res,next)=>{
    empModel.find((err,data)=>{
        if (err) throw err;
        res.render('index',{title:"cruds",message:"Employees", heading:"add details here",success:' ',record:data});
    })
});
app.get('/login',(req,res,next)=>{
    res.send("login successfull")
});
app.get('/logout',(req,res,next)=>{
    res.send("logout successfull")
});
app.get('/delete/:id',(req,res,next)=>{
    var id = req.params.id;
    empModel.findByIdAndDelete(id,(err)=>{
        if (err) throw err;
        res.redirect('/')
    })
})
app.get('/edit/:id',(req,res,next)=>{
    var id = req.params.id;
    var edit=empModel.findById(id);
    edit.exec(function(err,data){
        if(err) throw err;
        res.render('edit',{title:"cruds",message:"Employees", heading:"add details here",success:"Success",record:data})
    })

        
     
})
app.post('/update/',(req,res,next)=>{
    
    console.log(req.query.id)
    var update=empModel.findByIdAndUpdate(req.query.id,{
        $set:{
            
                first:req.body.first,
                last:req.body.last,
                message:req.body.message
            
        }, 
        
    });
    update.exec(function(err,data){
        if(err) throw err;
        employee.exec(function(err,data){
            if (err) throw err;
            res.redirect('/');
        });
    }); 
    });
    
 
app.listen(port,()=>{
    console.log(`i am port ${port}`)
})

