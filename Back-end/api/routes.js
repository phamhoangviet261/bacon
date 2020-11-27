const memberController = require('./controllers/MemberController');
const MemberInfoController = require('./controllers/MemberInfoController');
const memberInfoController = require('./controllers/MemberInfoController');

module.exports = function route (app) {
    app.route('/members/')
        .get(memberController.login)
        .post(memberController.register);

    app.use('/members/:username/', memberInfoController.middleware);

    app.route('/members/:username/')
        .get(memberInfoController.show)
        .post(MemberInfoController.edit);
};
