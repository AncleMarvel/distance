const students = require('../dbAPIs/students.js');

async function get(req, res, next) {
    try {
        const context = {};

        context.id = parseInt(req.params.id, 10);

        const rows = await students.find(context);

        if (req.params.id) {
            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            } else {
                res.status(404).end();
            }
        } else {
            res.status(200).json(rows);
        }
    } catch (err) {
        next(err);
    }
}

module.exports.get = get;

function getStudentsFromRec(req) {
    const student = {
        full_name: req.body.full_name,
        birthday: req.body.birthday,
        student_id: req.body.student_id,
        year_of_admissin: req.body.year_of_admissin,
        year_of_ending: req.body.year_of_ending,
        id_group: req.body.id_group
    };

    return student;
}

async function post(req, res, next) {
    try {
        let student = getStudentsFromRec(req);

        student = await students.create(student);

        res.status(201).json(student);
    } catch (err) {
        next(err);
    }
}

module.exports.post = post;

async function put(req, res, next) {
    try {
        let student = getStudentsFromRec(req);

        student.id = parseInt(req.params.id, 10);
        console.log(student);
        student = await students.update(student);

        if (student !== null) {
            res.status(200).json(student);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

module.exports.put = put;

async function del(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        
        const success = await students.delete(id);

        if (success) {
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

module.exports.delete = del;