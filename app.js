const exp=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const { response } = require("express");
const blogs=[];
const app=exp();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(exp.static("public"));

const homecontent="This is the home page to this website and this description helps you to use the functionalities of this website. You can compose the daily blogs in the compose page and it is uploaded to the home page automatically. You can contact the developer at the contact page. About page gives you a short description of developer's view to this site. Thank You.";

app.get("/",function(req,res){
    var now=new Date();
    var today=now.toLocaleDateString();
    res.render("home",{content:homecontent,day:today,data:blogs});
});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/about",function(req,res){
    res.render("about");
});

app.get("/compose",function(req,res){
    res.render("compose");
});

app.get("/post/:topic",function(req,res){
    const top=req.params.topic;
    var i=0;
    for(i=0;i<blogs.length;i++){
        if(top==blogs[i].title)break;
    }
    res.render("post",{t:top,b:blogs[i].body});
});

app.post("/",function(request,response){
    var now=new Date();
    var time=now.toLocaleTimeString();
    var head=request.body.head;
    var txt="("+time+" IST) "+request.body.blog;
    const kv={
        title:head,
        body:txt
    };
    blogs.push(kv);
    response.redirect("/");
});

app.post("/compose",function(request,response){
    response.render("compose");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is listening at port 3000....");
});