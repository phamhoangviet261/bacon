const jwt = require('jsonwebtoken');

const db = require('./../db');

module.exports = {
    show: async (req, res) => {
        let sql = 'select id_question, score, datetime_answer, datetime_update ' +
        'from MembersAnswers where id_member =  ?';
        const values = [req.params.id_member];

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
        ;
    },

    create: async (req, res) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'id_question')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi tạo',
                    errors: [
                        {
                            message: 'Thiếu id bài tập',
                            field: 'id_question',
                        },
                    ],
                });

            return;
        }
        if (!Object.prototype.hasOwnProperty.call(req.body, 'answer')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi tạo',
                    errors: [
                        {
                            message: 'Thiếu câu trả lời',
                            field: 'answer',
                        },
                    ],
                });

            return;
        }

        const sql = 'SELECT `member_answer`(?, ?, ?)';
        try {
            const result = await db.execute(sql, [
                req.body.id_member,
                req.body.id_question,
                req.body.answer,
            ]);

            res.status(201)
                .type('json')
                .json({
                    message: 'Tạo thành công',
                    score: result,
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
        try {
            const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            if (req.params.id_member !== payload.id) {
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

        if (!Object.prototype.hasOwnProperty.call(req.body, 'answer')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi tạo',
                    errors: [
                        {
                            message: 'Thiếu câu trả lời',
                            field: 'answer',
                        },
                    ],
                });

            return;
        }

        const sql = 'SELECT `member_answer`(?, ?, ?)';

        try {
            const result = await db.execute(sql, [
                req.params.id_member,
                req.params.id_question,
                req.body.answer,
            ]);

            res.status(200)
                .type('json')
                .json({
                    message: 'Sửa thành công',
                    score: result,
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
