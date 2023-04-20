const express=require('express');
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");


var new_db="mongodb://localhost:27017/demo_db";
const saltRounds=10;

mongoose.connect(new_db)
.then(()=>  console.log("Database has been creatred successfully...."))
.catch((err)=>console.log("Eroor"));

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({Extended:true}));
app.use('/public', express.static(__dirname + '/public'));

const profileSchema=new mongoose.Schema({
  name:String,
  password:String
});

const Profile=mongoose.model("Profile",profileSchema);


app.get("/",function(req,res){
  res.sendFile(__dirname+"/public/index.html");
});

app.post("/",function(req,res){

  const mail=req.body.exampleInputEmail1;
  const password=req.body.exampleInputPassword1;


  bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(password, salt, function(err, hash) {
    // Store hash in your password DB.
    if(err)
       throw err;
    else{
      const profile=new Profile({
        name:mail,
        password:hash,
      });
      profile.save();
    }
  });
});
  console.log(req.body);
  res.sendFile(__dirname+"/public/success.html");
});

Profile.find()
.then(results=>{console.log(results)})
.catch((err)=>console.log("Error"));



app.listen(3000,function(){
  console.log("Server is running on 3000");
})
