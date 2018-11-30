const express = require('express');
const router = express.Router();
const firebaseDB = require('../connections/firebas_admin_connect');
const firebase = require('../connections/firebase_connect');
const categoriesRef = firebaseDB.ref('/categories');
const articlesRef = firebaseDB.ref('/articles');

// 註冊畫面
router.get('/signup', function (req, res, next) {
    res.render('dashboard/signup',{
        error:req.flash('error')
    });
});
// 註冊post
router.post('/signup/post', function (req, res, next) {
    const user_data = req.body;
    const email = user_data.email;
    const password = user_data.password;
    const nickname = user_data.nickname;
    if(user_data.confirm_password !== password){
        req.flash('error','密碼驗證錯誤');
        res.redirect('/auth/signup');
    }
    firebase.auth().createUserWithEmailAndPassword(email,password).then(function(auth){
        
        firebaseDB.ref('/users').push({
            email,
            nickname,
            uid:auth.user.uid
        }).then(()=>{
            req.session.uid = auth.user.uid;
            req.session.nickname = nickname;
            res.redirect('/');
        });
    }).catch((err)=>{
        req.flash('error',err.message);
        res.redirect('/auth/signup');
    });
});

//登入畫面
router.get('/login', function (req, res, next) {
    res.render('dashboard/login',{
        error:req.flash('error')
    });
});

//登入post
router.post('/login/post', function (req, res, next) {
    const user_data = req.body;
    const email = user_data.email;
    const password = user_data.password;
    firebase.auth().signInWithEmailAndPassword(email,password).then(function(auth){
        firebaseDB.ref('/users').once('value',(snapshot)=>{
            const users = snapshot.val();
            let nickname = '';
            for (let i in users){
                if(users[i].uid == auth.user.uid) nickname = users[i].nickname;
            }
            req.session.uid = auth.user.uid;
            req.session.nickname = nickname;
            res.redirect('/');
        });
        
    }).catch((err)=>{
        req.flash('error',err.message);
        res.redirect('/auth/login');
    });
});
//登出 logout
router.get('/logout', function (req, res, next) {
    req.session.uid = '';
    req.session.nickname = '';
    res.redirect('/');
});

module.exports = router;