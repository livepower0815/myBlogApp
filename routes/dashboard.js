const express = require('express');
const router = express.Router();
const firebaseDB = require('../connections/firebas_admin_connect')
const categoriesRef = firebaseDB.ref('/categories');
const articlesRef = firebaseDB.ref('/articles');
const striptags = require('striptags');
const moment = require('moment');

router.get('/archives', function (req, res, next) {
    let status = req.query.status || 'public';
    let categories = {};
    categoriesRef.once('value').then((snapshot) => {
        categories = snapshot.val();
        return articlesRef.orderByChild('updateTime').once('value');
    }).then((snapshot) => {
        let articles = [];
        let articleObj = snapshot.val();
        for (let i in articleObj) {
            if (status === articleObj[i].status) {
                articles.push(articleObj[i]);
            }
        }
        articles.reverse();
        res.render('dashboard/archives', {
            title: 'Express',
            articles,
            categories,
            striptags,
            moment,
            status
        });
    });
});

//新增文章
router.get('/article/create', function (req, res, next) {
    categoriesRef.once('value').then((snapshot) => {
        const categories = snapshot.val();
        res.render('dashboard/article', {
            title: 'Express',
            categories
        });
    });

});


router.get('/article/:id', function (req, res, next) {
    const id = req.params.id;
    let categories = {};
    categoriesRef.once('value').then((snapshot) => {
        categories = snapshot.val();
        return articlesRef.child(id).once('value');
    }).then(function (snapshot) {
        let article = snapshot.val();

        res.render('dashboard/article', {
            title: 'Express',
            categories,
            article
        });
    });

});

//post 新增文章
router.post('/article/create', function (req, res, next) {
    let data = req.body;
    let article = articlesRef.push();
    let key = article.key;
    const updateTime = Math.floor(Date.now() / 1000);
    data.id = key;
    data.updateTime = updateTime;
    article.set(data).then(function () {
        res.redirect(`/dashboard/article/${key}`);
    });
});

//edit article
router.post('/article/update/:id', function (req, res, next) {
    let data = req.body;
    let id = req.params.id;
    articlesRef.child(id).update(data).then(function () {
        res.redirect(`/dashboard/article/${id}`);
    });
});

//delete article
router.post('/article/delete/:id', (req, res) => {
    const id = req.params.id;
    articlesRef.child(id).remove().then(() => {
        req.flash('info', '成功刪除');
        res.send('文章已經刪除');
        res.end();
        // res.redirect('/dashboard/categories');
    })
    
});




router.get('/signup', function (req, res, next) {
    res.render('dashboard/signup', {
        title: 'Express'
    });
});


//管理分類頁面
router.get('/categories', function (req, res, next) {
    categoriesRef.once('value').then((snapshot) => {
        const categroies = snapshot.val();
        const messages = req.flash('info');
        res.render('dashboard/categories', {
            categroies,
            messages,
            ifInfo: messages.length > 0
        });

    });
});

//新增分類
router.post('/categories/create', (req, res) => {
    const data = req.body;
    const categoryRef = categoriesRef.push();
    const key = categoryRef.key;
    data.id = key;
    categoriesRef.orderByChild('path').equalTo(data.path).once('value')
        .then((snaptshot) => {
            if (snaptshot.val() !== null) {
                req.flash('info', '路徑重複請輸入另一個路徑');
                res.redirect('/dashboard/categories');
            } else {
                categoryRef.set(data).then(() => {
                    req.flash('info', '已新增欄位');
                    res.redirect('/dashboard/categories');
                });
            }
        });

});

//刪除分類
router.post('/categories/delete/:id', (req, res) => {
    const id = req.params.id;
    categoriesRef.child(id).remove().then(() => {
        req.flash('info', '成功刪除')
        res.redirect('/dashboard/categories');
    })
});


module.exports = router;