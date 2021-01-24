const jwt = require('jsonwebtoken');

const db = require('./../db');
// https://gist.github.com/gordonbrander/2230317
const code = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};
module.exports = {
    middleware: (req, res, next) => {
        /* try {
            if (!req.cookies.token) {
                res.status(401)
                    .type('json')
                    .json({
                        message: 'Thất bại khi xác thực. Đề nghị đăng nhập lại',
                    });
                return;
            }

            jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            next();
        } catch (e) {
            res.status(500)
                .type('json')
                .json({
                    message: 'Xác thực thông tin thất bại. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ',
                });
        } */
        next();
    },

    show: async (req, res) => {
        try {
            let sql = 'select c.id_course as "id", c.name as "name", c.code as "code", c.subject as "subject",' +
        'c.length as "length", c.price as "price", meminfo.id_member as "teacher_id", meminfo.name as "teacher_name"' +
        'from Courses c join MembersInfo meminfo on c.teacher = meminfo.id_member';
            let result;
            if (Object.prototype.hasOwnProperty.call(req.params, 'id_course')) {
                sql += ' where c.id_course = ?';

                [result] = await db.execute(sql, [req.params.id_course]);

                res.status(200)
                    .type('json')
                    .json(result[0]);
                return;
            }

            [result] = await db.execute(sql);
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
                            message: 'Thiếu tên khoá học',
                            field: 'name',
                        },
                    ],
                });

            return;
        }
        if (!Object.prototype.hasOwnProperty.call(req.body, 'subject')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi tạo',
                    errors: [
                        {
                            message: 'Thiếu chủ đề',
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
                            message: 'Thiếu thời gian học',
                            field: 'length',
                        },
                    ],
                });

            return;
        }
        if (!Object.prototype.hasOwnProperty.call(req.body, 'price')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi tạo',
                    errors: [
                        {
                            message: 'Thiếu giá khoá học',
                            field: 'price',
                        },
                    ],
                });

            return;
        }
        try {
            const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            const sql = 'insert into Courses (`name`, `code`, `subject`, `length`, `price`, `teacher`) ' +
            'values (?, ?, ?, ?, ?, ?)';

            await db.execute(sql, [
                req.body.name,
                code(),
                req.body.subject,
                req.body.length,
                req.body.price,
                payload.id,
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

        let result;
        try {
            [result] = db.execute(sql, [req.params.id_course]);

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

            if (!Object.prototype.hasOwnProperty.call(req.body, 'name')) {
                res.status(400)
                    .type('json')
                    .json({
                        message: 'Thiếu thông tin khi cập nhật',
                        errors: [
                            {
                                message: 'Thiếu tên khoá học',
                                field: 'name',
                            },
                        ],
                    });

                return;
            }
            if (!Object.prototype.hasOwnProperty.call(req.body, 'subject')) {
                res.status(400)
                    .type('json')
                    .json({
                        message: 'Thiếu thông tin khi cập nhật',
                        errors: [
                            {
                                message: 'Thiếu chủ đề',
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
                        message: 'Thiếu thông tin khi cập nhật',
                        errors: [
                            {
                                message: 'Thiếu thời gian học',
                                field: 'length',
                            },
                        ],
                    });

                return;
            }
            if (!Object.prototype.hasOwnProperty.call(req.body, 'price')) {
                res.status(400)
                    .type('json')
                    .json({
                        message: 'Thiếu thông tin khi cập nhật',
                        errors: [
                            {
                                message: 'Thiếu giá khoá học',
                                field: 'price',
                            },
                        ],
                    });

                return;
            }

            sql = 'update Courses set `name` = ?, ' +
            '`subject` = ?, ' +
            '`length` = ?, ' +
            '`price` = ?, ' +
            'where id_course = ?';

            await db.execute(sql, [
                req.body.name,
                req.body.subject,
                req.body.length,
                req.body.price,
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
