var mongoose=require('mongoose');
mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/update");


var PostSchema=mongoose.Schema({
    title:String,
    content:String
});

var Post=mongoose.model("Post",PostSchema);


var UserSchema=mongoose.Schema({
    name:String,
    age:Number,
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]
});

var User=mongoose.model("User",UserSchema);



var post1=new Post({
    title:"How to learn Java",
    content:"blah blah blah blah"
});

var post2=new Post({
    title:"How to learn Python",
    content:"blah blah blah blah"
});

var post3=new Post({
    title:"How to learn C++",
    content:"blah blah blah blah"
})

var post4=new Post({
    title:"How to learn C",
    content:"blah blah blah blah"
});

post1.save();
post2.save();
post3.save();
post4.save();

var user1=new User({
    name:"Bob Smith",
    age:50,
    posts:[post1._id,post2._id]
});

var user2=new User({
    name:"Alice Hellen",
    age:40,
    posts:[post3._id,post4._id]
});

user1.save();
user2.save();


User.findOne({name:"Bob Smith"}).populate("posts").exec(function(err,posts){
    if(err){
        console.log(err);
    }else {
        console.log(posts.posts[0].title);
    }
});