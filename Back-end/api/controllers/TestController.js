const jwt = require('jsonwebtoken');

const mysql = require('mysql');
const db = require('./../db');

module.exports = {
    show: (req, res) => {
        const sql = 'select id_test, name, length, content ' +
        'from Tests where id_course =  ?';

        const query = mysql.format(
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

                res.status(200)
                    .type('json')
                    .json(result);
            },
        );
    },

    create: (req, res) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'name')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi tạo',
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
                    message: 'Thiếu thông tin khi tạo',
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
                    message: 'Thiếu thông tin khi tạo',
                    errors: [
                        {
                            message: 'Thiếu nội dung bài tập',
                            field: 'content',
                        },
                    ],
                });

            return;
        }

        const sql = 'insert into Tests (`name`, `length`, `content`, `id_course`) ' +
        'values (?, ?, ?, ?)';

        const query = mysql.format(
            sql,
            [
                req.body.name,
                req.body.length,
                req.body.content,
                req.params.id_course,
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
                        message: 'Tạo thành công',
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
        'where id_course = ?';

        query = mysql.format(
            sql,
            [
                req.body.name,
                req.body.length,
                req.body.content,
                req.params.id_course,
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
