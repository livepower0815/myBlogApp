var express = require('express');
var router = express.Router();
var firebaseDB = require('../connections/firebas_admin_connect');
const categoriesRef = firebaseDB.ref('/categories');
const articlesRef = firebaseDB.ref('/articles');
const moment = require('moment');
const convertPagination = require('../modules/convertPagination');

/* GET home page. */
router.get('/', function (req, res, next) {
  let current_page = req.query.page || 1;
  let categories = {};
  const uid = req.session.uid;
  const nickname = req.session.nickname;
  categoriesRef.once('value').then((snapshot) => {
    categories = snapshot.val();
    return articlesRef.orderByChild('updateTime').once('value');
  }).then((snapshot) => {
    let articles = [];
    let articleObj = snapshot.val();
    for (let i in articleObj) {
      if (articleObj[i].status === 'public') {
        articles.push(articleObj[i]);
      }
    }
    articles.reverse();
    const perPage = 5;
    let data = convertPagination(articles,current_page,perPage);
    
    res.render('index', {
      title: 'Express',
      articles: data.resource,
      categories,
      moment,
      page: data.page,
      uid,
      nickname
    });
  });
});


//顯示文章
router.get('/post/:id', function (req, res, next) {
  const uid = req.session.uid;
  const nickname = req.session.nickname;
  const id = req.params.id;
  let categories = {};
  categoriesRef.once('value').then((snapshot) => {
    categories = snapshot.val();
    return articlesRef.child(id).once('value');
  }).then(function (snapshot) {
    let article = snapshot.val();

    res.render('post', {
      title: 'Express',
      categories,
      article,
      moment,
      uid,
      nickname
    });
  });
});

//留言功能
router.get('/comment',function(req,res){
  const nickname =  req.query.nickname;
  const id =  req.query.id;
  const comment =  req.query.comment;
  if(comment == ''){
    res.redirect('/post/' + id);
  }else {
  firebaseDB.ref('/articles/' + id + '/comments').push({nickname,comment}).then((snapshot)=>{
    res.redirect('/post/' + id);
  })}
  
  
});


module.exports = router;