const fs = require("fs")
const data = require('./data')
const { age } = require('./util')
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("por favor validar todos os campos")
        }
    }
    let { avatar_url, birth, name, degree, gender, typeofclass, areas } = req.body
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)
    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        degree,
        areas,
        typeofclass,
        created_at,
    })
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("erro gravar no arquivo")
        return res.send(req.body)
    })
}
exports.show = function(req, res) {
    const { id } = req.params
    const foundTeachers = data.teachers.find(function(teachers) {
        return teachers.id == id
    })
    if (!foundTeachers) {
        res.send("professor não encontrado")
    }
    const teachers = {
        ...foundTeachers,
        age: age(foundTeachers.birth),
        areas: foundTeachers.areas.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeachers.created_at),

    }
    return res.render("teachers/show", { teachers })
}