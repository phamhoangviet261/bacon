const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const crypto = require('crypto');

const db = require('./../db');

/**
 * @param   {string}    password    password
 * @param   {string}    salt        salt for hash
 * @returns {string}                string after hash
 */
function sha256 (password, salt) {
    const hash = crypto.createHmac('sha256', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    const result = hash.digest('hex');
    return result;
};

/**
 * @param   {string} password       password
 * @returns {string}                string after hash
 */
function hashPassword (password) {
    return sha256(password, process.env.SALT);
}
module.exports = {

    login: (req, res) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi đăng nhập',
                    errors: [
                        {
                            message: 'Thiếu tên tài khoản',
                            field: 'username',
                        },
                    ],
                });

            return;
        }

        if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi đăng nhập',
                    errors: [
                        {
                            message: 'Thiếu mật khẩu',
                            field: 'password',
                        },
                    ],
                });

            return;
        }

        const sql = 'select id_member, password from Members where username = ?';
        const username = [req.body.username];
        const query = mysql.format(
            sql,
            username,
        );

        db.query(
            query,
            (err, result) => {
                if (err) {
                    res.status(500)
                        .type('json')
                        .json({
                            message: 'Đăng nhập thất bại. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ',
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
                const password = hashPassword(req.body.password);

                // username là unique key nên chỉ trả về 1 item
                if (result[0].password === password) {
                    const payload = {
                        id: result[0].id_member,
                        username: req.body.username,
                    };
                    const token = jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                    );

                    res.status(200)
                        .cookie('token', token)
                        .type('json')
                        .json({
                            message: 'Đăng nhập thành công',
                        });

                    return;
                }

                res.status(400)
                    .type('json')
                    .json({
                        message: 'Thông tin không chính xác',
                        errors: [
                            {
                                message: 'Mật khẩu không đúng',
                                filed: 'password',
                            },
                        ],
                    });
            },
        );
    },

    register: (req, res) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi đăng kí',
                    errors: [
                        {
                            message: 'Thiếu tên tài khoản',
                            field: 'username',
                        },
                    ],
                });

            return;
        }

        if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi đăng kí',
                    errors: [
                        {
                            message: 'Thiếu mật khẩu',
                            field: 'password',
                        },
                    ],
                });

            return;
        }

        if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) {
            res.status(400)
                .type('json')
                .json({
                    message: 'Thiếu thông tin khi đăng kí',
                    errors: [
                        {
                            message: 'Thiếu email',
                            field: 'email',
                        },
                    ],
                });

            return;
        }
        const password = hashPassword(req.body.password);
        const sql = 'CALL `create_user`(?, ?, ?, ?);';
        const query = mysql.format(
            sql,
            [
                req.body.username,
                password,
                req.body.email,
                'Member',
            ],
        );

        db.query(
            query,
            (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        res.status(400)
                            .type('json')
                            .json({
                                message: 'Đăng kí thất bại',
                                errors: [
                                    {
                                        message: 'Tài khoản đã tồn tại',
                                        field: 'username',
                                    },
                                ],
                            });
                        return;
                    }

                    res.status(500)
                        .type('json')
                        .json({
                            message: 'Đăng kí thất bại. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ',
                        });
                    return;
                }

                res.status(201)
                    .type('json')
                    .json({
                        message: 'Đăng kí thành công',
                    });
            },
        );
    },

};
