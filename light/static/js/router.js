const router = new VueRouter({
    routes :[
        { path: '/',
            component: Main,
            children:[
                {
                    path:"/",
                    component:Index,
                },
                {path:'/add',
                    component:Add
                },
                {path:'/edit/:id',
                    component:edit
                },
            ]
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/reg',
            component:Reg
        }
    ]
})
router.beforeEach(function(to,from,next){
    if(to.path=="/login"||to.path=="/reg"){
        next();
    }else{
        if(!sessionStorage.login){   //随着浏览器关闭，sessionStorage清除
            router.push("/login")
        }else{
            next();
        }
    }
})
