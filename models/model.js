const mongoose=require("mongoose");
mongoose.connect('mongodb+srv://admin:lf@123Shristi@cluster0.ibnzh.mongodb.net/cruds?retryWrites=true&w=majority',
{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false});
var db=mongoose.connection;
// if(!db){
//     console.log("error");
// }
// else{
//     console.log("connection successfull");
// }
var mongooseSchema=new mongoose.Schema({
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
    }
});

const empModel=mongoose.model('crud',mongooseSchema);
module.exports=empModel;