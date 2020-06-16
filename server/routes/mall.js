var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Mall = require('../models/mall')

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/mall')
mongoose.connection.on("connected",function(){
    console.log("MongoDB connected success.")
});
mongoose.connection.on("error",function(){
    console.log("MongoDB connected fail.")
});
mongoose.connection.on("disconnectd",function(){
    console.log("MongoDB connceted dis connected.")
})

//登录
router.post('/login',function(req,res,next){
    var param={
        username:req.body.username,
        password:req.body.password
    }
    Mall.findOne(param,function(err,doc){
            if(err){
                res.json({  
                    status:'1',
                    msg:'',
                    result:{
                      err:"没有这个用户"
                    }
                  })
            }
            else{          
              res.cookie("userId",doc.userId,{path:'/',maxAge:1000*60*60});
              // req.session.user = doc;
              res.json({
                status:'0',
                msg:'成功',
                result:{
                  userName:doc.username
                }
              });
            }
          })
})

//获取轮播图
router.get('/slider',function(req,res,next){
    var userId = req.cookies.userId;
    Mall.findOne({userId:userId},function(err,doc){
      if(err){
        res.json({
          status:'1',
          msg:err.message
        });
      }else{
        if(doc){
          res.json({
            status:'0',
            msg:'',
            result:doc.sliderList
          })
        }
      }
    })
})
//获取商标
router.get('/brand',function(req,res,next){
  var userId = req.cookies.userId;
  Mall.findOne({userId:userId},function(err,doc){
    console.log(doc)
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc.brand
        })
      }
    }
  })
})
//获取今日推荐
router.get('/recommendList',function(req,res,next){
  var userId = req.cookies.userId;
  Mall.findOne({userId:userId},function(err,doc){
    console.log(doc)
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc.recommendList
        })
      }
    }
  })
})
//获取关于我们的图片
router.get('/aboutus',function(req,res,next){
  var userId = req.cookies.userId;
  Mall.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc.aboutus
        })
      }
    }
  })
})
//获取菜单
router.get('/menuList',function(req,res,next){
  var userId = req.cookies.userId;
  Mall.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc.menuList
        })
      }
    }
  })
})
//获取地址信息
router.get('/contact',function(req,res,next){
  var userId = req.cookies.userId;
  Mall.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc.contact
        })
      }
    }
  })
})
//获取全部
//获取地址信息
router.get('/',function(req,res,next){
  var userId = req.cookies.userId;
  Mall.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc
        })
      }
    }
  })
})
module.exports =router;