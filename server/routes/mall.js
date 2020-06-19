var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Mall = require('../models/mall')
const mall = require('../models/mall')

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
              res.cookie("userId",doc._id,{path:'/',maxAge:1000*60*60});
              // req.session.user = doc;
              res.json({
                status:'0',
                msg:'成功',
                result:doc
              });
            }
          })
})

//获取轮播图
router.get('/slider',function(req,res,next){
    var userId = req.cookies.userId;
    console.log(userId)
    Mall.findById({_id:userId},function(err,doc){
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
  Mall.findById({_id:userId},function(err,doc){
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
  Mall.findById({_id:userId},function(err,doc){
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
  Mall.findById({_id:userId},function(err,doc){
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
  Mall.findById({_id:userId},function(err,doc){
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
  Mall.findById({_id:userId},function(err,doc){
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
  Mall.findById({_id:userId},function(err,doc){
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
// router.get('/test',function(req,res,next){
//   Mall.save(function(err,doc){
//     if(err1){
//       console.log("second")
//       res.json({
//           status:"1",
//           msg:err1.message
//       })
//   }else{   
//       res.json({
//           status:"0",
//           msg:'',
//           result:'success'
//       })
//   }
//   })
// })
// 添加轮播图
router.post('/addslider',function(req,res,next){
  var userId=req.cookies.userId;
  var slider=req.body.slider;
  var sliderImg = req.body.sliderImg;
  var sliderList={slider,sliderImg};
  console.log(sliderList)
  Mall.findById({_id:userId},function(err,result){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      result.sliderList.push(sliderList);
      result.save(function(err1,doc){
        if(err1){
          res.json({
            status:'1',
            msg:err.message
          })
        }else{
          res.json({
            status:'0',
            msg:'',
            result:'success'
          })
        }
      })
    }
  })
})
// 修改轮播图图片
//获取当前轮播图
router.get("/nowslider",function(req,res,next){
  sliderId = req.param("slider");
  var userId=req.cookies.userId;
  Mall.find({'sliderList':sliderId},function(err,doc){
    if(err){
            res.json({
              status:"1",
              msg:err.message,
              result:''
            })
          }else{
                res.json({
                  status:"0",
                  msg:'?/??',
                  result:doc
                })
              }
  })
})
// 删除轮播图图片
router.post("/deleteslider",function(req,res,next){
  var userId=req.cookies.userId;
  var sliderId = req.body.sliderId;
  Mall.update({_id:userId},{$pull:{'sliderList':{'_id':sliderId}}},function(err,doc){
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      });
    }else{
      console.log("waimina")
      res.json({
        status:"0",
        msg:'',
        result:'suc'
      });
    }
  })
})
module.exports =router;