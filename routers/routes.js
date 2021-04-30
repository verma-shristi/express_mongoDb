const express=require("express");
const router=express.Router();
const empModel=require('../models/model');

router.get('/',(req,res)=>{
    res.render("index",{title:"cruds",message:"employees"})
})
router.post('/',(req,res)=>{
    console.log(req.body);
    var empData=new empModel({
        first:req.body.fname,
        last:req.body.lname,
        message:req.body.desc
    });
    empData.save((err,res1)=>{
        if(err) throw err;
        empData.exec((err,data)=>{
            if(err) throw err;
            res.render('index',{records:data})
        })
    })
   
})
module.exports=router;