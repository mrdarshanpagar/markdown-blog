const express = require('express')
const { count } = require('./../models/article')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new',(req, res)=>{
    res.render("articles/new",{article: new Article()})
})

router.get('/:id',(req, res)=>{
    res.send(req.params.id)
})

router.post('/', async(req, res)=>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })

    try{
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    }catch(err){
        console.log(err.message)
        res.render('articles/new',{article: article})
    }
})

module.exports = router