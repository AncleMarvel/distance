const database = require('../services/database.js');
const oracledb = require('oracledb');

const baseQuery =
    `select * from student`;

async function find(context) {
    let query = baseQuery;
    const binds = {};

    if (context.id) {
        binds.id = context.id;

        query += `\nwhere id = :id`;
    }

    const result = await database.simpleExecute(query, binds);

    return result.rows;
}

module.exports.find = find;

const createSql =
    `insert into student(full_name, birthday, student_id, year_of_admissin, year_of_ending, id_group) 
    values(:full_name, to_date(:birthday, 'DD/MM/YY'), :student_id, to_date(:year_of_admissin, 'DD/MM/YY'), to_date(:year_of_ending, 'DD/MM/YY'), :id_group)`;

async function create(st) {
    const student = Object.assign({}, st);

    // student.id = {
    //     dir: oracledb.BIND_OUT,
    //     type: oracledb.NUMBER
    // }

    const result = await database.simpleExecute(createSql, student);

    // student.id = result.outBinds.id[0];

    return student;
}

module.exports.create = create;

const updateSql =
    `update student
    set full_name = :full_name,
    birthday = to_date(:birthday, 'DD/MM/YY'),
    student_id = :student_id,
    year_of_admissin = to_date(:year_of_admissin, 'DD/MM/YY'),
    year_of_ending = to_date(:year_of_ending, 'DD/MM/YY'),
    id_group = :id_group where id = :id`;

async function update(st) {
    const student = Object.assign({}, st);
    const result = await database.simpleExecute(updateSql, student);

    if (result.rowsAffected && result.rowsAffected === 1) {
        return student;
    } else {
        return null;
    }
}

module.exports.update = update;

const deleteSql =
    `begin
 
    delete from student
    where student.id = :id;

    :rowcount := sql%rowcount;
 
    end;`

async function del(id) {
    const binds = {
        id: id,
        rowcount: {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        }
    }
    const result = await database.simpleExecute(deleteSql, binds);

    return result.outBinds.rowcount === 1;
}

module.exports.delete = del;