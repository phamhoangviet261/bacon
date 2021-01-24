const jwt = require('jsonwebtoken');

const db = require('./../db');

module.exports = {

    show: async (req, res) => {
        const sql = 'select name, sex, date_birth, date_registration from MembersInfo info JOIN Members mem ON info.id_member = mem.id_member' +
                    ' where mem.username = ?';

        try {
            const result = await db.execute(sql, [req.params.username]);

            if (result.length < 1) {
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
        } catch (e) {
            console.log(e);
            res.status(500)
                .type('json')
                .json({
                    message: 'Không thể lấy thông tin. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ',
                });
        }
    },

    edit: async (req, res) => {
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
            // không trùng username thì huỷ
            if (req.params.username !== payload.username) {
                res.status(403)
                    .type('json')
                    .json({
                        message: 'Không có quyền',
                    });
                return;
            }
        } catch (e) {
            res.status(500)
                .type('json')
                .json({
                    message: 'Xác thực thông tin thất bại. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ',
                });
        }
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

        const sql = 'UPDATE MembersInfo info JOIN Members mem ON info.id_member = mem.id_member' +
                    ' SET name = ?, sex = ?, date_birth = ?' +
                    ' WHERE mem.username = ?';
        try {
            await db.execute(sql, [
                req.body.name,
                req.body.sex,
                req.body.date_birth,
                req.params.username,
            ]);

            res.status(201)
                .type('json')
                .json({
                    message: 'Thay đổi thông tin thành công',
                });
        } catch (e) {
            console.log(e);
            res.status(500)
                .type('json')
                .json({
                    message: 'Thay đổi thông tin thất bại. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ',
                });
        }
    },
};
