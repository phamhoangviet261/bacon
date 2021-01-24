const db = require('./../db');

module.exports = {
    show: async (req, res) => {
        let sql = 'select id_member, id_test, score' +
        'from MembersScore where id_member =  ?';
        const values = [req.params.id_member];

        if (Object.prototype.hasOwnProperty.call(req.params, 'id_test')) {
            sql += ' AND id_test = ?';
            // magic của javascript nên thôi đừng bàn tới nó .-.
            values.push(req.params.id_test);
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
};
