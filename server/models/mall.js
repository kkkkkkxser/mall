var mongoose = require('mongoose')
var Schema = mongoose.Schema;

//定义数据
var mallSchema = new Schema({
    "username":String,
    "password":String,
    "userId":String,
    "brand":String,
    "sliderList":[
        // {   sliderId:{type:Schema.Types.ObjectId, ref:"SliderId",sliderImg:String }  }
        {
            "slider":String,
            "sliderImg":String
        }
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
    }],   
});
// 自增try first
// var CounterSchema = Schema({
//     _id: {type: String, required: true},
//     seq: { type: Number, default: 0 }
// });
// var counter = mongoose.model('counter', CounterSchema);

// mallSchema.pre('save', function (next) {
//     let doc = this;
//     counter.findByIdAndUpdate({ _id:sliderList._Id  }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
//         if (error)
//             return next(error);
//         doc.sliderId = counter.seq;
//         next();
//     });
// });

autoIncrement = require('mongoose-auto-increment');
 
var connection = mongoose.createConnection("mongodb://127.0.0.1:27017/mall");
 
autoIncrement.initialize(connection);
   
module.exports = mongoose.model("Mall",mallSchema,"mall")