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
    }],   
});
var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
   });
   var counter = mongoose.model('counter', CounterSchema);
   
    
   
   var entitySchema = mongoose.Schema({
    testvalue: {type: String}
   });
   
   entitySchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter) {
    if(error)
    return next(error);
    doc.testvalue = counter.seq;
    next();
    });
   });
   
module.exports = mongoose.model("Mall",mallSchema,"mall")