const jwt = require('jsonwebtoken');

const db = require('./../db');

module.exports = {
    show: async (req, res) => {
        let sql = 'select id_question, id_test, name, content, score ' +
        'from Questions where id_test =  ?';

        const values = [req.params.id_test];

        if (Object.prototype.hasOwnProperty.call(req.params, 'id_question')) {
            sql += ' AND id_question = ?';
            // magic của javascript nên thôi đừng bàn tới nó .-.
            values.push(req.params.id_question);
        }
        try {
            const result = await db.execute(sql, values);
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
        if (!Object.prototype.hasOwnProperty.call(req.body, 'content')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi tạo',
                    errors: [
                        {
                            message: 'Thiếu nội dung câu hỏi',
                            field: 'content',
                        },
                    ],
                });

            return;
        }
        if (!Object.prototype.hasOwnProperty.call(req.body, 'score')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi tạo',
                    errors: [
                        {
                            message: 'Thiếu điểm của câu hỏi',
                            field: 'score',
                        },
                    ],
                });

            return;
        }

        const sql = 'insert into Questions (`id_test`, `content`, `score`) ' +
        'values (?, ?, ?)';
        try {
            await db.execute(sql, [
                req.params.id_test,
                req.body.content,
                req.body.score,
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
            const result = await db.execute(sql, [req.params.id_course]);
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
                return;
            }
        } catch (e) {
            console.log(e);
            res.status(500)
                .type('json')
                .json({
                    message: 'Lỗi .-.',
                });
        }

        if (!Object.prototype.hasOwnProperty.call(req.body, 'content')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi tạo',
                    errors: [
                        {
                            message: 'Thiếu nội dung câu hỏi',
                            field: 'content',
                        },
                    ],
                });

            return;
        }
        if (!Object.prototype.hasOwnProperty.call(req.body, 'score')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi tạo',
                    errors: [
                        {
                            message: 'Thiếu điểm của câu hỏi',
                            field: 'score',
                        },
                    ],
                });

            return;
        }

        sql = 'update Questions set `content` = ?, ' +
        '`score` = ?, ' +
        'where id_test = ? AND id_question  = ?';

        try {
            await db.execute(sql, [
                req.body.content,
                req.body.score,
                req.params.id_test,
                req.params.id_question,
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
