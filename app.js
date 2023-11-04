const express = require("express");
const bodyParser = require("body-parser"); // Import the body-parser middleware
const ejs = require("ejs");
const homeStartingContent = "Welcome to our blog! Here, you'll find a collection of interesting and informative articles on various topics. We're dedicated to providing valuable content to our readers. Explore our latest posts and stay updated with our blog.";
const aboutContent = "Our team of experts is passionate about sharing knowledge and insights on a wide range of subjects. We believe in the power of education and the impact it can have on people's lives. Our mission is to provide high-quality, engaging content that helps you learn and grow.";
const contactContent = "We value your feedback and inquiries. Please feel free to get in touch with us if you have any questions, comments, or requests. Your input is important to us, and we are here to assist you in any way we can. Reach out to us through the provided contact information.";
const app = express();
class postData {
  constructor(title, data) {
    this.title = title;
    this.data = data;
  }
}
const postDatas=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));// Use the body-parser middleware
app.use(express.static("public"));

app.get('/', function (req, res) {
  res.render('home', { homeStartingContent: homeStartingContent ,posts:postDatas});
});

app.get('/about', function (req, res) {
  res.render('about', { aboutContent: aboutContent });
});

app.get('/contact', function (req, res) {
  res.render('contact', { contactContent: contactContent });
});

app.get('/compose', function (req, res) {
  res.render('compose');
});
app.get('/post/:topic',function(req,res){
  var s=req.params.topic;
  var flag=false;
  for(var i=0;i<postDatas.length;i++){
    console.log(postDatas[i].title);
      if(s===postDatas[i].title){console.log('match found');flag=true;break;}
  }
})
app.listen(80, function () {
  console.log("Server started on port 80");
});

app.post('/compose', function (req, res) {
  postDatas.push(new postData(req.body.TitleHolder,req.body.PostHolder));
  res.redirect('/');
});
