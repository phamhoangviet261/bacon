const jwt = require('jsonwebtoken');

const db = require('../db');

module.exports = {
    show: async (req, res) => {
        let sql = 'select id_document, name, length, content ' +
        'from Documents where id_course =  ?';

        const values = [req.params.id_course];

        if (Object.prototype.hasOwnProperty.call(req.params, 'id_document')) {
            sql += ' AND id_document = ?';
            // magic của javascript nên thôi đừng bàn tới nó .-.
            values.push(req.params.id_lesson);
        }

        try {
            const [result] = await db.execute(sql, values);
            res.status(200)
                .type('json')
                .json(result);
        } catch (e) {
            console.log(e);
            res.status(500)
                .type('json')
                .json({
                    message: 'Lỗi .-.',
                });
        }
    },

    create: async (req, res) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'name')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi tạo',
                    errors: [
                        {
                            message: 'Thiếu tên tài liệu',
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
                            message: 'Thiếu thời gian tài liệu',
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
                            message: 'Thiếu nội dung tài liệu',
                            field: 'content',
                        },
                    ],
                });

            return;
        }

        const sql = 'insert into Documents (`name`, `length`, `content`, `id_course`) ' +
        'values (?, ?, ?, ?)';
        try {
            await db.execute(sql, [
                req.body.name,
                req.body.length,
                req.body.content,
                req.params.id_course,
            ]);

            res.status(201)
                .type('json')
                .json({
                    message: 'Tạo thành công',
                });
        } catch (e) {
            console.log(e);
            res.status(500)
                .type('json')
                .json({
                    message: 'Lỗi .-.',
                });
        }
    },

    update: async (req, res) => {
        let sql = 'select meminfo.id_member as "teacher_id" from MembersInfo ' +
        'where id_course = ?';
        try {
            const [result] = await db.execute(sql, [req.params.id_course]);

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

            if (!Object.prototype.hasOwnProperty.call(req.body, 'name')) {
                res.status(400)
                    .type('json')
                    .json({
                        message: 'Thiếu thông tin khi sửa',
                        errors: [
                            {
                                message: 'Thiếu tên tài liệu',
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
                                message: 'Thiếu thời gian tài liệu',
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
                                message: 'Thiếu nội dung tài liệu',
                                field: 'content',
                            },
                        ],
                    });

                return;
            }

            sql = 'update Documents set `name` = ?, ' +
        '`length` = ?, ' +
        '`content` = ?, ' +
        'where id_course = ? AND id_document = ?';

            await db.execute(sql, [
                req.body.name,
                req.body.length,
                req.body.content,
                req.params.id_document,
            ]);
            res.status(200)
                .type('json')
                .json({
                    message: 'Sửa thành công',
                });
        } catch (e) {
            console.log(e);
            res.status(500)
                .type('json')
                .json({
                    message: 'Lỗi .-.',
                });
        }
    },
};
