const memberController = require('./controllers/MemberController');

module.exports = function route (app) {

    app.route('/members').
        get(memberController.get).
        post(memberController.store);

    app.route('/members/:memberId').
        get(memberController.detail).
        put(memberController.update).
        delete(memberController.delete);

};