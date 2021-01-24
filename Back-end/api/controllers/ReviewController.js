const jwt = require('jsonwebtoken');

const db = require('./../db');

module.exports = {
    show: async (req, res) => {
        let sql = 'select id_member, id_course, start, content' +
        'from Reviews where id_member =  ?';
        const values = [req.params.id_member];

        if (Object.prototype.hasOwnProperty.call(req.params, 'id_course')) {
            sql += ' AND id_course = ?';
            // magic của javascript nên thôi đừng bàn tới nó .-.
            values.push(req.params.id_course);
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
        };
    },

    create: async (req, res) => {
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

            if (!Object.prototype.hasOwnProperty.call(req.body, 'star')) {
                res.status(400)
                    .type('json')
                    .json({
                        message: 'Thiếu thông tin khi tạo',
                        errors: [
                            {
                                message: 'Thiếu số lượng sao',
                                field: 'star',
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
                                message: 'Thiếu nội dung nhận xét',
                                field: 'content',
                            },
                        ],
                    });

                return;
            }

            const sql = 'insert into Reviews (`id_member`, `id_course`, `star`, `content`) ' +
                        'values (?, ?, ?, ?)';

            await db.execute(sql, [
                req.params.id_member,
                req.params.id_course,
                req.body.star,
                req.body.content,
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

            if (!Object.prototype.hasOwnProperty.call(req.body, 'star')) {
                res.status(400)
                    .type('json')
                    .json({
                        message: 'Thiếu thông tin khi tạo',
                        errors: [
                            {
                                message: 'Thiếu số lượng sao',
                                field: 'star',
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
                                message: 'Thiếu nội dung nhận xét',
                                field: 'content',
                            },
                        ],
                    });

                return;
            }

            const sql = 'update Reviews ' +
                ' set `star` = ?, ' +
                '`content` = ?, ' +
                'where id_member = ? AND id_course  = ?';

            await db.execute(sql, [
                req.body.star,
                req.body.content,
                req.params.id_member,
                req.params.id_course,
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
