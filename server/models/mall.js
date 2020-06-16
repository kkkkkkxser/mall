var mongoose = require('mongoose')
var Schema = mongoose.Schema;

//定义数据
var mallSchema = new Schema({
    "username":String,
    "password":String,
    "userId":String,
    "brand":String,
    "sliderList":[
        {"sliderImg" : String}
    ],
    "recommendList":[{
        "name":String,
        "enName":String,
        "description":String,
        "stars":Number
    }],
    "aboutus":String,
    "contact":[{
        "company-name":String,
        "company-address":String,
        "phone":String,
        "email":String,
        "Instagram":String,
        "Facebook":String
    }],
    "menuList":[{
        // "title":String,
        // "detailList":[{
        //     "type":String,
        //     "image":String,
        //     "name":String,
        //     "description":String,
        //     "pictureList":[{
        //         "picture":String
        //     }]
        // }]
    }]
});

module.exports = mongoose.model("Mall",mallSchema,"mall")