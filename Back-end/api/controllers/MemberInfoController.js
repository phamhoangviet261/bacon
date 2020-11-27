const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const db = require('./../db');

module.exports = {
    middleware: (req, res, next) => {
        let payload;
        try {
            if (!req.cookies.token) {
                res.status(401)
                    .type('json')
                    .json({
                        message: 'Thất bại khi xác thực. Đề nghị đăng nhập lại',
                    });
                return;
            }

            payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        } catch (e) {
            res.status(500)
                .type('json')
                .json({
                    message: 'Xác thực thông tin thất bại. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ',
                });
        }
        // trùng username thì chỉ cần trả lại thông tin mà không cần kiểm tra thêm
        if (req.params.username === payload.username) {
            const sql = 'select id_member from Members where username = ?';
            const query = mysql.format(
                sql,
                [payload.username],
            );

            db.query(
                query,
                (err, result) => {
                    if (err) {
                        res.status(500)
                            .type('json')
                            .json({
                                message: 'Xác thực thông tin thất bại. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ',
                            });
                        return;
                    }
                    // Tìm thấy id
                    // do username là unique key nên chỉ trả về đúng 1 kết quả
                    if (result.length > 0) {
                        req.app.locals.id_member = result[0].id_member;
                        next();
                    }
                },
            );
        } else {
            // Không trùng username thì xem username có tồn tại và client có quyền không ?

            // kiểm tra tồn tại
            let sql = 'select id_member from Members where username = ?';
            let query = mysql.format(
                sql,
                [req.params.username],
            );

            db.query(
                query,
                (err, result) => {
                    if (err) {
                        res.status(500)
                            .type('json')
                            .json({
                                message: 'Có lỗi xảy ra khi tìm kiếm tài khoản. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ',
                            });
                        return;
                    }

                    if (result.length === 0) {
                        res.status(404)
                            .type('json')
                            .json({
                                message: 'Tài khoản không tồn tại',
                            });
                    }
                },
            );

            // kiểm tra quyền client
            sql = 'select id_member, role from Members where username = ?';
            query = mysql.format(
                sql,
                [payload.username],
            );

            db.query(
                query,
                (err, result) => {
                    if (err) {
                        res.status(500)
                            .type('json')
                            .json({
                                message: 'Xác thực thông tin thất bại. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ',
                            });
                        return;
                    }
                    // Tìm thấy id
                    // do username là unique key nên chỉ trả về đúng 1 kết quả
                    if (result.length > 0) {
                        if (result[0].role === 'member') {
                            res.status(403)
                                .type('json')
                                .json({
                                    message: 'Không đủ quyền hạn truy cập thông tin này',
                                });
                        } else {
                            req.app.locals.id_member = result[0].id_member;
                            req.app.locals.role_member = result[0].role;
                        }
                        next();
                    }
                },
            );
        }
    },

    show: (req, res) => {
        const sql = 'select name, sex, date_birth, date_registration from MembersInfo where id_member = ?';
        const query = mysql.format(
            sql,
            [req.params.id_member],
        );

        db.query(
            query,
            (err, result) => {
                if (err) {
                    res.status(500)
                        .type('json')
                        .json({
                            message: 'Không thể lấy thông tin. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ',
                        });
                    throw err;
                }
                if (!result) {
                    res.status(404)
                        .type('json')
                        .json({
                            message: 'Thông tin không chính xác',
                            errors: {
                                username: 'Tài khoản không tồn tại',
                            },
                        });

                    return;
                }

                res.status(200)
                    .type('json')
                    .json({
                        message: 'Tìm thấy thông tin thành viên',
                        infos: {
                            name: result[0].name,
                            sex: result[0].sex,
                            date_birth: result[0].date_birth,
                            date_registration: result[0].date_registration,
                        },
                    });
            },
        );
    },

    edit: (req, res) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'name')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi thay đổi thông tin',
                    errors: [
                        {
                            message: 'Thiếu tên',
                            field: 'name',
                        },
                    ],
                });

            return;
        }

        if (!Object.prototype.hasOwnProperty.call(req.body, 'sex')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi thay đổi thông tin',
                    errors: [
                        {
                            message: 'Thiếu giới tính',
                            field: 'sex',
                        },
                    ],
                });

            return;
        }

        if (!Object.prototype.hasOwnProperty.call(req.body, 'date_birth')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi đăng kí',
                    errors: [
                        {
                            message: 'Thiếu ngày sinh',
                            field: 'date_birth',
                        },
                    ],
                });

            return;
        }

        const sql = 'UPDATE INTO Members (name, sex, date_birth) VALUES ( ?, ?, ?);';

        const query = mysql.format(
            sql,
            [req.body.name, req.body.sex, req.body.date_birth],
        );

        db.query(
            query,
            (err, result) => {
                if (err) {
                    res.status(500)
                        .type('json')
                        .json({
                            message: 'Thay đổi thông tin thất bại. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ',
                        });
                    return;
                }

                res.status(201)
                    .type('json')
                    .json({
                        message: 'Thay đổi thông tin thành công',
                    });
            },
        );
    },
};
