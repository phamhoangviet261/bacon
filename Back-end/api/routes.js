const memberController = require('./controllers/MemberController');

module.exports = function route (app) {
    app.route('/members/')
        .get(memberController.login)
        .post(memberController.register);
};
