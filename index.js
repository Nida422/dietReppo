const express=require('express');
const mongoose=require('mongoose');
const ejsMate=require('ejs-mate');
const path=require('path');
const Diet=require('./model/diets');
const User=require('./model/usermodel');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const ExpressError=require('./ExpressError.js');
const wrapAsync=require('./wrapasync.js');

const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const sessionoptions={
    secret:'mysuperseretcode',
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};
app.use(session(sessionoptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currUser=req.user;
    next();
});
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dieting');
}
main().then(()=>console.log('DB is connected'))
.catch(err => console.log(err));


app.get('/signup',(req,res)=>{
    res.render('signup');
});
app.post('/signup',wrapAsync(async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    const newuser=new User({email,username});
    const registeredUser=await User.register(newuser,password);
    // console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash('success','Welcome to fitlife insight');
        res.redirect('/diet');
    })   
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/signup');
    }
}));
//login
app.get('/login',(req,res)=>{
    res.render('login');
});
app.post('/login',passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),async(req,res)=>{
    req.flash('success','Welcome back to fitlife insight');
    res.redirect('/diet');
});
app.get('/logout',(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash('success','you logged out');
        res.redirect('/diet');
    });
})

app.get('/diet',(req,res)=>{
    res.render('home2');
});  
app.post('/diet',wrapAsync(async(req,res)=>{
    // console.log(req.user);
    if(!req.isAuthenticated()){
        req.flash('error','you must logged in first');
        return res.redirect('/login');
    }
    const {mealType,foodType,foodItems,quantity}=req.body;
    const newDiet=new Diet({
        userId:req.user._id,
        mealType,foodType,foodItems,quantity
    })
    let q=await newDiet.save();
    
    res.redirect('/diet');
}));
app.get('/dietDetails',wrapAsync(async(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash('error','you must logged in first');
        return res.redirect('/login');
    }
    let answers=await Diet.find({userId:new mongoose.Types.ObjectId(req.user._id)});
    // console.log(answer);
    res.render('dietDetails',{answers});
}));
app.get('/ayurveda',(req,res)=>{
    res.render('bughunter');
});
app.get('/chatbot',(req,res)=>{
    res.render('chatbot');
});
app.get('/contact',(req,res)=>{
    res.render('contact');
});
// for error handling
app.all('*',(req,res,next)=>{
    next(new ExpressError(404,'Page not found'));
});

app.use((err,req,res,next)=>{
    let {status=500,message='Some error occured'}=err;
    res.status(status).render('error.ejs',{message});
});

app.listen(8000,()=>{
    console.log('The port is listening 8000');
});