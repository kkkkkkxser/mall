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
router.post("/changeslider",function(req,res,next){
  var slider =req.body.slider;
  // var sliderN = req.body.slidername;
  var sliderImg = req.body.sliderImg;
  var nslider = req.body.nslider;
  console.log(slider);
  console.log(sliderImg);
  Mall.updateOne({'sliderList.slider':nslider},{"sliderList.$.slider":slider,"sliderList.$.sliderImage":sliderImg},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc
      })
    }
  })
})
// 修改联系我们信息
router.post("/changecontact",function(req,res,next){
  var companyName = req.body.companyName;
  var companyAddress= req.body.companyAddress;
  var phone = req.body.phone;
  var email = req.body.email;
  var Instagram = req.body.Instagram; 
  var Facebook =req.body.Facebook;
  var ncompanyName = req.body.ncompanyName;
  console.log(ncompanyName)
  Mall.updateOne({"contact.companyName":ncompanyName},{"contact.$.companyName":companyName,"contact.$.companyAddress":companyAddress,"contact.$.phone":phone,"contact.$.email":email,"contact.$.Instagram":Instagram,"contact.$.Facebook":Facebook},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc
      })
    }
  })
})
// 修改推荐信息
router.post("/changerecommend",function(req,res,next){
  var name = req.body.name;
  var enName= req.body.enName;
  var image = req.body.image;
  var description = req.body.description;
  var stars = req.body.stars;
  var nname = req.body.nname
  Mall.updateOne({'recommendList.name':nname},{"recommendList.$.name":name,"recommendList.$.enName":enName,"recommendList.$.image":image,"recommendList.$.description":description,"recommendList.$.stars":stars},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc
      })
    }
  })
})
// 删除推荐信息
router.post("/deleterecommend",function(req,res,next){
  var userId=req.cookies.userId;
  var recname = req.body.recname;
  console.log(recname)
  Mall.update({_id:userId},{$pull:{'recommendList':{'name':recname}}},function(err,doc){
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:"0",
        msg:'',
        result:doc
      });
    }
  })
})
//获取当前推荐信息
router.get("/nowrecommend",function(req,res,next){
  recname = req.param("name");
    Mall.find({'recommendList.name':recname},{'recommendList.$':1},function(err,doc){
              if(err){
      res.json({
              status:"1",
              msg:err.message,
              result:''
            })
          }else{
                res.json({
                  status:"0",
                  msg:'',
                  result:doc
                })
              }
  })
})
// 添加推荐信息
router.post('/addrecommend',function(req,res,next){
  var userId=req.cookies.userId;
  var name = req.body.name;
  var enName= req.body.enName;
  var image = req.body.image;
  var description = req.body.description;
  var stars = req.body.stars;
  var recommendList = {name,enName,image,description,stars}
  Mall.findById({_id:userId},function(err,result){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      result.recommendList.push(recommendList);
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
// 修改菜单信息
// 删除菜单信息
// 添加菜单信息
//深度搜索
// function DF(data,key,value){
//       var result = [];
//       function deepFind(data,key,value){
//           if(data instanceof Array){
//               for(var i in data){
//                   deepFind(data[i],key,value);
//               }
//           }else if(data instanceof Object){
//               for(var name in data){
//                   if(name == key && data[name] == value){
//                       result.push(data);
//                   }else{
//                       deepFind(data[name],key,value);
//                   }
//               }
//           }
//       }
//       deepFind(data,key,value);
//       return result;
//   }

// router.get("/nowslider",function(req,res,next){
//   Mall.find({},function(err,doc){
//   if(err) throw err;
//   else{
//   res.json({
//     status:'0',
//     msg:'',
//     result:DF(doc,"_id","5eec718aceb46d02e4a37e5a")
//   })
// }
// })
// })
//获取当前轮播图
router.get("/nowslider",function(req,res,next){
  slider = req.param("slider");
    Mall.find({'sliderList.slider':slider},{'sliderList.$':1},function(err,doc){
              if(err){
      res.json({
              status:"1",
              msg:err.message,
              result:''
            })
          }else{
                res.json({
                  status:"0",
                  msg:'',
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