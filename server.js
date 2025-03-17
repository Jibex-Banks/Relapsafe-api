const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const Story = require('./model/story');
const Contact = require('./model/contact');
const User = require('./model/user');
const ObjectId = mongoose.Types.ObjectId;

const db = mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())

app.get('/',function(req,res){
    res.send('Hey there I am Working!!!');
});

app.post('/story',  function(req,res){
   var story = new Story();
   story.content = req.body.content;
   story.save().then(savedStory => res.status(200).send(savedStory)).catch(e => res.status(500).send("Could not send your story :(",e));
});

app.post('/contact',function(req,res){
    var contact = new Contact();
    contact.firstname = req.body.firstname;
    contact.lastname = req.body.lastname;
    contact.email = req.body.email;
    contact.phoneNumber = req.body.phoneNumber;
    contact.subject = req.body.subject;
    contact.message = req.body.message;
    contact.date = new Date().toLocaleString('en-US', { 
        month: 'numeric', 
        day: 'numeric', 
        year: '2-digit', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
    });
    contact.save().then((savedContact)=> res.send(savedContact)).catch((error)=>res.status(500).send("Error adding contact",error));
});

app.post('/user',function(req,res){
    const{userName, password} = req.body;
    const userd = User.findOne({userName})
    .then((users)=> {
        const Cpassword = users.get('password');
        // res.send(Cpassword);
        if( Cpassword === password ){
            res.send("Welcome!!");
        }else{
            res.status(404).send("Invalid Credentials");
        }
    }).catch((error)=>res.status(404).send("An Error Occured",error));
});

app.get('/adminStory',function(req, res){
    Story.find({}).then((stories)=>res.send(stories)).catch((error)=>res.status(404).send("errrrrooorr",error));
});

app.get('/support',function(req,res){
    Contact.find({}).then((contacts)=> res.send(contacts)).catch((error)=>console.log("An error occured",error));
});

app.get('/oneSupport/:id',function(req,res){
    const id = req.params.id
    Contact.findOne({_id: new ObjectId(id)}).then((contact)=> res.send(contact)).catch((error)=>console.log("An error occured",error));
});

app.post('/support/reply/:id',async function (req,res) {
    const supportId = req.params.id;
    const { replymessage } = req.body;
    await Contact.findOneAndUpdate(_id =new ObjectId(supportId),{reply:{replymessage:replymessage,datereplied: new Date().toLocaleString('en-US',{
        month: 'numeric',
        day: 'numeric',
        year:'numeric',
        hour: 'numeric',
        minute:'numeric',
        hour12: true
    })}}).then((reply)=>res.send(reply)).catch((error)=> res.status(404).send("error"))
})

app.listen(3000,function(req,res){
    console.log('I am working!!');
});