const jwt = require('jsonwebtoken');

const db = require('./../db');

module.exports = {
    show: async (req, res) => {
        const sql = 'select id_question, content ' +
        'from Answers where id_question =  ?';

        const values = [req.params.id_question];
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

        sql = 'update Answers set `content` = ?, ' +
        'where id_question  = ?';

        try {
            await db.execute(sql, [
                req.body.content,
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
