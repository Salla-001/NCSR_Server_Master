const connection = require('../connection')
const async = require('async');

const uid = 'u' + Math.round(Math.random() * 999999);

exports.register = async (req, res, next) => {
    const user = req.body;
    const uid = 'u' + Math.round(Math.random() * 999999);
    const sql = `INSERT INTO NCSR_user (user_id, email, password) VALUES (?, ?, ?)`;
    connection.query(
        sql,
        [uid, user.email, user.password],
        //[uid, "dgfgfgg", "dfdfdf"],
        (err, rows, fields) => {
            const result = {};
            if (err) {
                result.status = 'fail';
                result.data = err;
            }
            else {
                result.status = 'pass';
                result.data = { id: uid };
            }
            // console.log('User registration : ', result);
            res.json(result);
        }
    );
    // console.log("running");
};

exports.saveProfile = async (req, res, next) => {
    const profile = req.body;
    async.waterfall(
        [
            function (callback) {
                const sql = `SELECT * FROM NCSR_user_profile 
                WHERE user_id = ?`;
                connection.query(
                    sql,
                    [profile.id],
                    (err, rows, fields) => {
                        if (err) {
                            callback(err);
                        } else {
                            callback(err, rows);
                        }
                    }
                );
            },
            function (result, callback) {

                let sql = '';
                if (result && result.length && result.length > 0) {
                    // update existing row
                    sql = `UPDATE NCSR_user_profile 
                        SET first_name = ?, last_name = ?, 
                        phone_number = ?, address = ?, 
                        WHERE user_id = ?`
                } else {
                    // insert new row
                    sql = `INSERT INTO NCSR_user_profile 
                        (first_name, last_name, 
                            phone_number, address, 
                            user_id) 
                        VALUES (?, ?, ?, ?, ?)`
                }
                const values = [
                    profile.firstName,
                    profile.lastName,
                    profile.phoneNumber,
                    profile.address,
                    profile.id,
                    // "asdf",
                    // "asdfas",
                    // 6868688686,
                    // "asdasdfasdfadsf",
                    // uid
                ];
                // console.log('Saving profile: ', sql, values);
                connection.query(
                    sql,
                    values,
                    (err, rows, fields) => {
                        if (err) {
                            callback(err);
                        } else {
                            callback(err, rows);
                        }
                    }
                );
            },
        ],
        function (err, result) {
            const output = {};
            if (err) {
                output.status = 'fail';
                output.data = err;
            } else {
                output.status = 'pass';
                output.data = result;
            }
            // console.log('Profile Save: ', output);
            res.json(output);
        }

    )
};

exports.saveRole = async (req, res, next) => {
    const role = req.body;
    async.waterfall(
        [
            function (callback) {
                const sql = `SELECT * FROM NCSR_user_role 
                WHERE user_id = ?`;
                connection.query(
                    sql,
                    [role.id],
                    (err, rows, fields) => {
                        if (err) {
                            callback(err);
                        } else {
                            callback(err, rows);
                        }
                    }
                );
            },
            function (result, callback) {

                let sql = '';
                if (result && result.length && result.length > 0) {
                    // update existing row
                    sql = `UPDATE NCSR_user_role 
                        SET role_id = ?
                        WHERE user_id = ?`
                } else {
                    // insert new row
                    sql = `INSERT INTO NCSR_user_role 
                        (role_id, user_id) 
                        VALUES (?, ?)`
                }
                connection.query(
                    sql,
                    [role.role, role.id],
                    //["ORGANISER","u779909"],
                    (err, rows, fields) => {
                        if (err) {
                            callback(err);
                        } else {
                            callback(err, rows);
                        }
                    }
                );
            },
        ],
        function (err, result) {
            const output = {};
            if (err) {
                output.status = 'fail';
                output.data = err;
            } else {
                output.status = 'pass';
                output.data = result;
            }
            res.json(output);
        }

    )
};

exports.getRoles = async (req, res, next) => {
    const result = {};
    const params = req.body;
    // console.log('Load user roles for : ', [params.id]);
    const sql = `SELECT * 
    FROM NCSR_user_role 
    WHERE user_id = ? `;
    connection.query(
        sql,
        [params.id],
        (err, rows, fields) => {
            if (err) {
                result.status = 'fail';
                result.data = err;
            } else {
                result.status = 'pass';
                result.data = rows;
            }
            // console.log('User roles : ', result);
            res.json(result);
        }
    );
    // console.log("running");
};

