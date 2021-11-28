const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app= express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/userinformation");

const infoSchema ={
    name: String,
    email: String,
    password: String,
   

    totalorders: String
   
};

const Information = mongoose.model("Infodetails", infoSchema);
app.get("/", function(req, res){
    Information.find({}, function(err, founditems){
        if (err) {
            console.log(err);
          } else {
            res.render("home",
              {
                
                details: founditems
      
              });
          }
    });
});
app.get("/insert", function(req, res){
   res.render("list");
});



app.post("/insert", function(req, res){
    const data = new Information({
        name: req.body.username,
        email: req.body.Email,
        password: req.body.Password,
        
        totalorders:req.body.Orders,
        
    });
    data.save(function (err) {
        if (!err) {
          res.redirect("/");
        }
      });
});

app.get("/details/:userId", function(req, res){
    let para = req.params.userId;
    Information.findById(para, function(err, findcontent){
        if(err){
            console.log(err);

        } else{
            res.render("indivisual",
            {
            customerName: findcontent.name,
            CEmail: findcontent.email,
            password: findcontent.password,
            totalorders:findcontent.totalorders,
            });
        }
    });
});

app.route("/update/:customername")
 
 .get(function(req, res){
     
    Information.findOne({name: req.params.customername}, function(err, founddata){
        if(founddata){
            res.send(founddata);
        } else{
            res.send("No data name");
        }
    });
 })
 .put(function(req, res){
     Information.replaceOne(
         
         {name: req.body.title, 
         email: req.body.content,
         password:req.body.password,
         totalorders:req.body.totalorders
        },
         {overwrite: true},
         function(err){
             if(!err){
                 res.redirect("/");
             }
         }
     );
 })

 .delete(function(req, res){
         Information.deleteOne(
            {name: req.params.customername},
             function(err){
                 if(!err){
                     res.send("successfully deleted")
                 } else{
                     res.send(err);
                 }
             }
         );
     });







app.listen(3000, ()=>{
    console.log("Server started on port  3000");
});

