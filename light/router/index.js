var light=require("ueklight");
var mysql=require("./mysql");
var md5=require("./md5");
var router=light.Router();
router.get("/",function(req,res){
    res.render("index.html",{name:"light"});
})

router.get("/fetch",function (req,res) {
    setTimeout(function(){
    mysql.query("select * from demo",function (err,result) {
        if(err){
            console.log(err);
            res.end();
        }else{
           // res.render('index.html',{data:result});
            res.send(JSON.stringify(result));
        }
      })
    },2000)
})

router.get("/del/:id",function (req,res) {
   var id=req.params.id.substr(0);
   // var id=req.params.id;
    setTimeout(function(){
    mysql.query("delete from demo where id="+id,function (err,result) {
        if(err){
            res.end("err");
        }else{
            res.send("ok");
        }
      })
    },2000)
})

router.get("/addCon",function (req,res) {
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    setTimeout(function(){
    mysql.query(`insert into demo (name,age,sex) values("${name}","${age}","${sex}")`,
        function (err,result) {
        if(err){
            res.end("err");
        }else{

            res.send("ok");
        }
      })
    },2000)
})

router.get("/edit/:id",function (req,res) {
    var id=req.params.id;
    setTimeout(function(){
        mysql.query("select * from demo where id="+id,function (err,result) {
            if(err){
                res.end("err");
            }else{
                res.send(JSON.stringify(result));
            }
        })
    },2000)
})

router.get("/editCon",function (req,res) {
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    var id=req.query.id;
    setTimeout(function(){
        mysql.query(`update demo set name="${name}",age="${age}",sex="${sex}" where id=`+id,function (err,result) {
            if(err){
                res.end("err");
            }else{
                res.send("ok");
            }
        })
    },2000)
})

router.get("/check",function(req,res){
    var name=req.query.name;
    var pass=md5(req.query.pass);
    mysql.query(`select * from user where name="${name}" and pass="${pass}"`,
        function(err,result){
            if(err){
                var obj={code:"",state:"err"}
                res.send(JSON.stringify(obj))
                  }else {
                      if(result.length>0){
                          var obj={code:md5(name),state:"ok"}
                          res.send(JSON.stringify(obj))
                       }else {
                          var obj={code:"",state:"err"}
                          res.send(JSON.stringify(obj))
                      }
            }
        })

})

router.get("/nameask",function(req,res){
    var name=req.query.name;
    mysql.query(`select * from user where name="${name}"`,function(err,result){
        if(err){
            res.send("err")
        }else{
            if(result.length>0){
                res.send("ok")
            }else{
                res.send("err")
            }
        }
    })
})

router.get("/userchech",function(req,res){
    var name=req.query.name;
    var pass=md5(req.query.pass);
    console.log(name)
    console.log(pass)
    mysql.query(`insert into user (name,pass) values ("${name}","${pass}")`,function(err,result){
        if(err){
            res.send("err")
        }else{
            if(result.affectedRows>0){
                res.send("ok")
            }else{
                res.send("err")
            }
        }
    } )
})
