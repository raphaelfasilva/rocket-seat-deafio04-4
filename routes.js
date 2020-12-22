const express = require('express')
const routes = express.Router()
const teachers = require('./teachers');
routes.get('/', function(req, res) {
    return res.redirect("/teachers")

})
routes.get('/teachers', function(req, res) {
    return res.render("teachers/index")
})
routes.post('/teachers', teachers.post)
routes.get('/teachers/create', function(req, res) {
    return res.render("teachers/create")
})
routes.get('/members', function(req, res) {
    return res.render("members/index")
})
routes.get('/teachers/:id', teachers.show)
routes.get('/teachers/:id/edit', teachers.edit)
module.exports = routes