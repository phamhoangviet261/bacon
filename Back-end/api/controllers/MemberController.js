const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const crypto = require('crypto');

const db = require('./../db');

function sha256(password, salt){
    const hash = crypto.createHmac('sha256', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    const value = hash.digest('hex');
    return value;
    
};

function saltHashPassword(password) {
    return sha256(password, process.env.SALT);
}
module.exports = {

    'login': (req, res) => {
        if( !req.body.hasOwnProperty('username')) {
            res.status(400).
            type('json').
            json({
                'message': 'Thiếu thông tin khi đăng nhập',
                'errors': [
                    {
                        'message': 'Thiếu tên tài khoản',
                        'field': 'username'
                    }
                ]
            });

            return;
        }

        if( !req.body.hasOwnProperty('password')) {
            res.status(400).
            type('json').
            json({
                'message': 'Thiếu thông tin khi đăng nhập',
                'errors': [
                    {
                        'message': 'Thiếu mật khẩu',
                        'field': 'password'
                    }
                ]
            });

            return;
        }

        const sql = 'select password from Members where username = ?';
        const username = [req.body.username];
        const query = mysql.format(
            sql,
            username
        );

        db.query(
            query,
            (err, result) => {
                if (err) {
                    res.status(500).
                    type('json').
                    json({
                        'message': 'Đăng nhập thất bại. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ'
                    });
                    throw err;
                }
                if (!result) {
                    res.status(404).
                        type('json').
                        json({
                            'message': 'Thông tin không chính xác',
                            'errors': {
                                'username': 'Tài khoản không tồn tại'
                            }
                        });

                    return;
                }

                if (result.password === res.password) {
                    const payload = {
                        'username': res.username
                    };
                    const token = jwt.sign(
                        payload,
                        process.env.JWT_SECRET
                    );

                    res.status(200).
                        type('json').
                        json({
                            'message': 'Đăng nhập thành công',
                            token
                        });

                    return;
                }

                res.status(400).
                    type('json').
                    json({
                        'message': 'Thông tin không chính xác',
                        'errors': [
                            {
                                'message': 'Mật khẩu không đúng',
                                'filed': 'password'
                            }
                        ]
                    });
            }
        );
    },

    'register': (req, res) => {
        if( !req.body.hasOwnProperty('username')) {
            res.status(400).
            type('json').
            json({
                'message': 'Thiếu thông tin khi đăng kí',
                'errors': [
                    {
                        'message': 'Thiếu tên tài khoản',
                        'field': 'username'
                    }
                ]
            });

            return;
        }

        if( !req.body.hasOwnProperty('password')) {
            res.status(400).
            type('json').
            json({
                'message': 'Thiếu thông tin khi đăng kí',
                'errors': [
                    {
                        'message': 'Thiếu mật khẩu',
                        'field': 'password'
                    }
                ]
            });

            return;
        }

        if( !req.body.hasOwnProperty('email')) {
            res.status(400).
            type('json').
            json({
                'message': 'Thiếu thông tin khi đăng kí',
                'errors': [
                    {
                        'message': 'Thiếu email',
                        'field': 'email'
                    }
                ]
            });

            return;
        }
        const hashPassword = saltHashPassword(req.body.password);
        const sql = 'INSERT INTO Members (username, password, email) VALUES ( ?, ?, ?);'
        const value = [
            req.body.username,
            hashPassword,
            req.body.email
        ];

        const query = mysql.format(
            sql,
            value
        );

        db.query(
            query,
            (err, result) => {
                if (err) {
                    if( err.code === 'ER_DUP_ENTRY') {
                        res.status(500).
                        type('json').
                        json({
                            'message': 'Đăng kí thất bại',
                            'errors': [
                                {
                                    'message': 'Tài khoản đã tồn tại',
                                    'field': 'username'
                                }
                            ]
                        });
                        return;
                    }
                    
                    res.status(500).
                    type('json').
                    json({
                        'message': 'Đăng kí thất bại. Xin hãy liên hệ bộ phận kĩ thuật để được hỗ trợ'
                    });
                    return;
                }
                
                res.status(201).
                type('json').
                json({
                    'message': 'Đăng kí thành công'
                });
            }
        );
    }

};