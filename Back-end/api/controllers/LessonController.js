const jwt = require('jsonwebtoken');

const db = require('./../db');

module.exports = {
    show: async (req, res) => {
        let sql = 'select id_lesson, name, length, content ' +
        'from Lessons where id_course =  ?';

        // xem dòng bên dưới
        const value = [req.params.id_course];

        if (Object.prototype.hasOwnProperty.call(req.params, 'id_lesson')) {
            sql += ' AND id_lesson = ?';
            // magic của javascript nên thôi đừng bàn tới nó .-.
            value.push(req.params.id_lesson);
        }
        try {
            const [result] = await db.execute(sql, value);
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
                            message: 'Thiếu tên bài học',
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
                            message: 'Thiếu thời gian bài học',
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
                            message: 'Thiếu nội dung bài học',
                            field: 'content',
                        },
                    ],
                });

            return;
        }

        const sql = 'insert into Lessons (`name`, `length`, `content`, `id_course`) ' +
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
        let sql = 'select id_member as "teacher_id" from Courses ' +
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
                                message: 'Thiếu tên bài học',
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
                                message: 'Thiếu thời gian bài học',
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
                                message: 'Thiếu nội dung bài học',
                                field: 'content',
                            },
                        ],
                    });

                return;
            }

            sql = 'update Lessons set `name` = ?, ' +
                '`length` = ?, ' +
                '`content` = ?, ' +
                'where id_course = ? AND id_lesson = ?';

            await db.execute(sql, [
                req.body.name,
                req.body.length,
                req.body.content,
                req.params.id_course,
                req.params.id_lesson,
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
