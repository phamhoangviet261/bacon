const jwt = require('jsonwebtoken');

const mysql = require('mysql');
const db = require('./../db');

module.exports = {
    show: (req, res) => {
        let sql;
        let query;
        if (Object.prototype.hasOwnProperty.call(req.params, 'id_course')) {
            sql = 'select c.id_course as "id", c.name as "name", c.code as "code", c.subject as "subject", ' +
            'c.length as "length", c.price as "price", meminfo.id_member as "teacher_id", meminfo.name as "teacher_name" ' +
            'from Courses c join MembersInfo meminfo on c.teacher = meminfo.id_member ' +
            'where c.id_course = ?';

            query = mysql.format(
                sql,
                [req.params.id_course],
            );
        } else {
            sql = 'select c.id_course as "id", c.name as "name", c.code as "code", c.subject as "subject", ' +
            'c.length as "length", c.price as "price", meminfo.id_member as "teacher_id", meminfo.name as "teacher_name" ' +
            'from Courses c join MembersInfo meminfo on c.teacher = meminfo.id_member ' +
            'where c.id_course in ' +
            '(select cs.id_course ' +
            'from CoursesSold cs ' +
            'where cs.id_member = ? ';

            query = mysql.format(
                sql,
                [req.params.id_member],
            );
        }

        db.query(
            query,
            (err, result) => {
                if (err) {
                    res.status(500)
                        .type('json')
                        .json({
                            message: 'Lỗi .-.',
                        });
                    return;
                }

                res.status(200)
                    .type('json')
                    .json(result);
            },
        );
    },

    buy: (req, res) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'id_course')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi mua khoá học',
                    errors: [
                        {
                            message: 'Thiếu id khoá học',
                            field: 'id_course',
                        },
                    ],
                });

            return;
        }

        const sql = 'insert into Tests (`id_member`, `id_course`, `status`, `date_bought`, `score`) ' +
        'values (?, ?, ?, ?)';

        const query = mysql.format(
            sql,
            [
                req.params.id_member,
                req.body.id_course,
                'Chưa thanh toán',
                new Date().toISOString().slice(0, 19).replace('T', ' '),
                'NULL',
                0,
            ],
        );

        db.query(
            query,
            (err, result) => {
                if (err) {
                    res.status(500)
                        .type('json')
                        .json({
                            message: 'Lỗi .-.',
                        });
                    return;
                }

                res.status(201)
                    .type('json')
                    .json({
                        message: 'Đã mua thành công',
                    });
            },
        );
    },

    update: (req, res) => {
        let sql = 'select meminfo.id_member as "teacher_id" from MembersInfo ' +
        'where id_course = ?';

        let query = mysql.format(
            sql,
            [req.params.id_course],
        );

        db.query(
            query,
            (err, result) => {
                if (err) {
                    res.status(500)
                        .type('json')
                        .json({
                            message: 'Lỗi .-.',
                        });
                    return;
                }

                if (result.length < 1) {
                    res.status(404)
                        .type('json')
                        .json({
                            message: 'Không tìm thấy khoá học',
                        });

                    return;
                }
                const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
                if (result[0].teacher_id !== payload.id) {
                    res.status(403)
                        .type('json')
                        .json({
                            message: 'Không có quyền',
                        });
                }
            },
        );

        if (!Object.prototype.hasOwnProperty.call(req.body, 'name')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi sửa',
                    errors: [
                        {
                            message: 'Thiếu tên bài tập',
                            field: 'name',
                        },
                    ],
                });

            return;
        }
        if (!Object.prototype.hasOwnProperty.call(req.body, 'length')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi sửa',
                    errors: [
                        {
                            message: 'Thiếu thời gian bài tập',
                            field: 'length',
                        },
                    ],
                });

            return;
        }
        if (!Object.prototype.hasOwnProperty.call(req.body, 'content')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi sửa',
                    errors: [
                        {
                            message: 'Thiếu nội dung bài tập',
                            field: 'content',
                        },
                    ],
                });

            return;
        }

        sql = 'update Tests set `name` = ?, ' +
        '`length` = ?, ' +
        '`content` = ?, ' +
        'where id_course = ? AND id_test = ?';

        query = mysql.format(
            sql,
            [
                req.body.name,
                req.body.length,
                req.body.content,
                req.params.id_course,
                req.params.id_test,
            ],
        );

        db.query(
            query,
            (err, result) => {
                if (err) {
                    res.status(500)
                        .type('json')
                        .json({
                            message: 'Lỗi .-.',
                        });
                    return;
                }

                res.status(200)
                    .type('json')
                    .json({
                        message: 'Sửa thành công',
                    });
            },
        );
    },
};
