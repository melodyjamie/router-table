//头部组件
var Head=Vue.component("Head",{
    template:`
        <h1 class="title">表格的增删改查
         <router-link to="/" >首页</router-link>
         <router-link to="/add" >添加</router-link>
     </h1>
    `,
    methods:{
        logout(){
            sessionStorage.removeItem("login");
            this.$route.push("/login")
        }
    }
})

var Main=Vue.component("Main",{
    template:`
    <div>
    <Head></Head>
    <router-view></router-view>
</div>
    `
})

//等待
var wait=Vue.component("wait",{
    template:`
    <div class="wait"></div>
    `,
})

//提示信息
var Info=Vue.component("Info",{
    props:["message"],
    template:`
    <div class="Info">{{message}}</div>
    `,
})

//查询  删除
var Table=Vue.component("Table",{
    props:["tableHead"],
    template:`
<div>
    <table class="sizetable">
        <tr>
            <th v-for="item in tableHead" class="sizeth">{{item}}</th>
            <th class="sizeth">操作</th>
        </tr>
        <tr v-for="item in datas">
            <td class="sizetd">{{item.name}}</td>
            <td class="sizetd">{{item.age}}</td>
            <td class="sizetd">{{item.sex}}</td>
            <td class="sizetd">
                <a href="#/" @click="del(item.id)">删除</a> 
                <a :href="'#/edit/'+item.id">编辑</a>
            </td>
        </tr>
    </table>
    <wait v-show="show"></wait>
    <Info v-show="infoshow" :message="infos"></Info>
</div>
    `,
    data(){
        return{
            datas:[],
            show:false,
            infoshow:false,
            infos:'',
        }
    },
    methods:{
        del(id){
            var that=this;
            that.show=true;
           /* fetch("/del/"+id).then(function(e){
                return e.text;
            }).then(function(data){
                if(data=="ok"){
                    that.datas=that.datas.filter(function(b){
                        return b.id !=id;
                    })
                    that.messages="删除成功";
                    that.show=false;
                    that.infoshow=true;

                }else{
                    that.messages="删除失败";
                    that.show=false;
                    that.infoshow=true;
                }
            })*/
          var xml=new XMLHttpRequest();
            xml.onload=function () {
                if(xml.response == "ok"){
                    that.datas=that.datas.filter(function(a){
                        return a.id !=id;})
                    that.infos="删除成功";
                    that.infoshow=true;
                    that.show=false;
                }else{
                    that.infos="删除失败";
                    that.infoshow=true;
                    that.show=false;
                }
            }
            xml.open("get","/del/"+id);
            xml.send();
        }
    },
    mounted(){
        var that=this;
        that.datas=[];
       /* var xml=new XMLHttpRequest();
        xml.onload=function(){
            this.show=false;
            that.datas=JSON.parse(xml.response);
        }
        xml.open("get","/fetch");
        xml.send();*/
       that.show=true;
        fetch("/fetch").then(function (e) {
            return  e.json();
        }).then(function (e) {
            that.show=false;
            that.datas=e;
        })
    }
})

//结构
var Index=Vue.component("Index",{
    template:`
        <div>
            <Table :tableHead="['姓名','年龄','性别']">
               
            </Table>
        </div>
    `
})

//添加
var Add=Vue.component("Add",{
    template:`
<div>
            <form>
      <div class="form-group">
        <label for="name">姓名</label>
        <input type="text" class="form-control" id="name" placeholder="name" name="name" v-model="name">
      </div>
      
      <div class="form-group">
        <label for="age">年龄</label>
        <input type="text" class="form-control" id="age" placeholder="age" name="age" v-model="age">
      </div>
       <div class="form-group">
        <label for="sex">性别</label>
        <input type="text" class="form-control" id="sex" placeholder="sex" name="sex" v-model="sex">
      </div>
     
      <button type="submit" class="btn btn-default" @click="submit()">Submit</button>
    </form>
    <wait v-show="show"></wait>
    <Info v-show="infoshow" :message="infos"></Info>
</div>
    `,
    data(){
        return {
            name:"",
            age:"",
            sex:"",
            show:false,
            infoshow:false,
            infos:"",
        }
    },
    methods:{
        submit(){
            var datastring="name="+this.name+"&age="+this.age+"&sex="+this.sex;
            this.show=true;
            fetch("/addCon?"+datastring).then((res)=>{
                return res.text();
            }).then((e)=>{
                if(e=="ok"){
                    this.infos="添加成功";
                    this.infoshow=true;
                    this.show=false;
                    this.name="";
                    this.age="";
                    this.sex="";
                }else{
                    this.infos="添加失败";
                    this.infoshow=true;
                    this.show=false;
                }

            })
        }
    }
})

//编辑
var edit=Vue.component("edit",{
    template:`
<div>
            <form>
      <div class="form-group">
        <label for="name">姓名</label>
        <input type="text" class="form-control" id="name" placeholder="name" name="name" v-model="name">
      </div>
      
      <div class="form-group">
        <label for="age">年龄</label>
        <input type="text" class="form-control" id="age" placeholder="age" name="age" v-model="age">
      </div>
       <div class="form-group">
        <label for="sex">性别</label>
        <input type="text" class="form-control" id="sex" placeholder="sex" name="sex" v-model="sex">
      </div>
     
      <button type="submit" class="btn btn-default" @click="submit()">Submit</button>
    </form>
    <wait v-show="show"></wait>
    <Info v-show="infoshow" :message="infos"></Info>
</div>
    `,
    data(){
        return{
            name:"",
            age:"",
            sex:"",
            show:false,
            infoshow:false,
            infos:'',
        }
    },
    methods:{
        submit(){
            var datastring="name="+this.name+"&age="+this.age+"&sex="+this.sex+"&id="+this.$route.params.id;
            fetch("/editCon?"+datastring).then((res)=>{
                return res.text();
            }).then((e)=>{
                alert(e)
                if(e=="ok"){
                    this.infos="编辑成功";
                    this.infoshow=true;
                    this.show=false;
                }else{
                    this.infos="编辑失败";
                    this.infoshow=true;
                    this.show=false;
                }
            })
        }
    },
    mounted(){
        this.show=true;
        fetch("/edit/"+this.$route.params.id).then((res)=>{
            return res.json();
        }).then((data)=>{
            this.name=data[0].name;
            this.age=data[0].age;
            this.sex=data[0].sex;
            this.show=false;
        })
    }
})

//登陆
var Login=Vue.component("Login",{
    template:  `
 <div class="login">
     <h3>登陆页</h3>
     <router-link to="/login">登陆</router-link>
     <router-link to="/reg">注册</router-link>
<form class="form-horizontal form-box">
  <div>{{message}}</div>
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">姓名</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputEmail3" placeholder="name" v-model="name">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Password" v-model="pass">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default" @click="check">登陆</button>
      <button type="submit" class="btn btn-default">注册</button>
    </div>
  </div>
</form>
</div>
    `,
    data(){
        return{
            name:"",
            pass:"",
            message:"",
        }
    },
    methods:{
        check(){
            /*前后台约定  ok*/
            var search="name="+this.name+"&pass="+this.pass;
            fetch("/check?"+search).then(function(e){
                return e.json();
            }).then((e)=>{
                console.log(e.state)
                if(e.state=="ok"){
                    this.message="登陆成功";
                    sessionStorage.login=e.code;
                    this.$router.push("/");
                }else{
                    this.message="登陆失败";
                    this.$router.push("/login");
                    this.name="";
                    this.pass="";
                }
            })
        }
    }
})

//注册
var Reg=Vue.component("Reg",{
    template:  `
  <div class="login">
     <h3>注册页面</h3>
     <router-link to="/login">登陆</router-link>
     <router-link to="/reg">注册</router-link>
<form class="form-horizontal form-box">
  <div>{{message}}</div>
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">姓名</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputEmail3" placeholder="name" v-model="name" @blur="blur">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Password" v-model="pass">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">确认密码</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Password" v-model="pass1">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default" @click="submit">注册</button>
    </div>
  </div>
</form>
</div>
    `,
    data(){
        return{
            name:"",
            pass:"",
            pass1:"",
            message:"",
            flag:false
        }
    },
    methods:{
        blur(){
            this.message="";
            var search="name="+this.name;
            fetch("/nameask?"+search).then(function(e){
                return e.text();
            }).then(a=>{
                if(a=="ok"){
                    this.message="用户存在";
                    this.name=""
                }
            })
        },
        submit(){
            if(this.name==""){
                this.message="用户名不能为空";
                return;
            }
            if(this.pass==""){
                this.message="密码不能为空";
                return;
            }
            if(this.pass1==""){
                this.message="确认密码";
                return;
            }
            if(this.pass!==this.pass1){
                this.message="两次密码不一致";
                return;
            }
           var search="name="+this.name+"&pass="+this.pass;
           fetch("/userchech?"+search).then(function(e){
               return e.text()
           }).then((e)=>{
               console.log(e)
               if(e=="ok"){
                   this.message="注册成功";
                   this.name="";
                   this.pass="";
                   this.pass1=""
               }else{
                   this.message="注册失败";
                   this.name="";
                   this.pass="";
                   this.pass1=""
               }
           })
        },
    }
/*  data(){
      return{
          name:"",
          pass:"",
          pass1:"",
          message:"",
      }
  },
    methods:{
        submit(){
            if(this.name==""){
                this.message="用户名不能为空"
            }
            if(this.pass==""){
                this.message="密码不能为空"
            }
            if(this.pass1==""){
                this.message="确认密码"
            }
            if(this.pass!==this.pass1){
                this.message="两次密码不一致"
            }
            var search="name="+this.name+"&pass="+this.pass;
            fetch("/nameask?"+search).then(function(e){
                return e.text();
            }).then((e)=>{
                if(e=="ok"){
                    this.message="注册成功";
                    this.name="";
                    this.pass="";
                    this.pass1="";
                }else{
                    this.message="注册失败";
                    this.name="";
                    this.pass="";
                    this.pass1="";
                }
            })
        },
        blur(){

        }
    }*/
})