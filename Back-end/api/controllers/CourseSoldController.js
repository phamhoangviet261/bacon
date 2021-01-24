const jwt = require('jsonwebtoken');

const db = require('./../db');

module.exports = {
    show: async (req, res) => {
        try {
            if (Object.prototype.hasOwnProperty.call(req.params, 'id_course')) {
                const sql = 'select c.id_course as "id", c.name as "name", c.code as "code", c.subject as "subject", ' +
                'c.length as "length", c.price as "price", meminfo.id_member as "teacher_id", meminfo.name as "teacher_name" ' +
                'from Courses c join MembersInfo meminfo on c.teacher = meminfo.id_member ' +
                'where c.id_course = ?';

                const [result] = await db.execute(sql, [req.params.id_course]);
                res.status(200)
                    .type('json')
                    .json(result);
            } else {
                const sql = 'select c.id_course as "id", c.name as "name", c.code as "code", c.subject as "subject", ' +
                'c.length as "length", c.price as "price", meminfo.id_member as "teacher_id", meminfo.name as "teacher_name" ' +
                'from Courses c join MembersInfo meminfo on c.teacher = meminfo.id_member ' +
                'where c.id_course in ' +
                '(select cs.id_course ' +
                'from CoursesSold cs ' +
                'where cs.id_member = ? ';

                const [result] = await db.execute(sql, [req.params.id_member]);
                res.status(200)
                    .type('json')
                    .json(result);
            }
        } catch (e) {
            res.status(500)
                .type('json')
                .json({
                    message: 'Lỗi .-.',
                });
        }
    },

    register: async (req, res) => {
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

        try {
            await db.execute(sql, [
                req.params.id_member,
                req.body.id_course,
                'Chưa thanh toán',
                new Date().toISOString().slice(0, 19).replace('T', ' '),
                'NULL',
                0,
            ]);
            res.status(201)
                .type('json')
                .json({
                    message: 'Đã đăng kí thành công',
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

            const sql = 'update Tests set `name` = ?, ' +
            '`length` = ?, ' +
            '`content` = ?, ' +
            'where id_course = ? AND id_test = ?';

            await db.execute(sql, [
                req.body.name,
                req.body.length,
                req.body.content,
                req.params.id_course,
                req.params.id_test,
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
