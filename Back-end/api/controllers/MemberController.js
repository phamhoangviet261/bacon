const db = require('./../db');

module.exports = {
    'delete': (req, res) => {

        const query = 'DELETE FROM Members WHERE id_member = ?';

        db.query(
            query,
            [req.params.productId],
            // eslint-disable-next-line no-unused-vars
            (err, response) => {

                if (err) {

                    throw err;

                }
                res.json({'message': 'Delete success!'});

            }
        );

    },
    'detail': (req, res) => {

        const query = 'SELECT * FROM Members WHERE id_member = ?';

        db.query(
            query,
            [req.params.memberId],
            (err, response) => {

                if (err) {

                    throw err;

                }
                res.json(response[0]);

            }
        );

    },

    'get': (req, res) => {

        const query = 'SELECT * FROM Members';

        db.query(
            query,
            (err, response) => {

                if (err) {

                    throw err;

                }
                res.json(response);

            }
        );

    },
    'store': (req, res) => {

        const data = req.body;
        const query = 'INSERT INTO Members SET ?';

        db.query(
            query,
            [data],
            // eslint-disable-next-line no-unused-vars
            (err, response) => {

                if (err) {

                    throw err;

                }
                res.json({'message': 'Insert success!'});

            }
        );

    },
    'update': (req, res) => {

        const data = req.body;
        const {productId} = req.params;
        const query = 'UPDATE Members SET ? WHERE id_member = ?';

        db.query(
            query,
            [
                data,
                productId
            ],
            // eslint-disable-next-line no-unused-vars
            (err, response) => {

                if (err) {

                    throw err;

                }
                res.json({'message': 'Update success!'});

            }
        );

    }
};