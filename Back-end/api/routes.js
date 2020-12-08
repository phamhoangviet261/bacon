const memberController = require('./controllers/MemberController');
const memberInfoController = require('./controllers/MemberInfoController');
const courseController = require('./controllers/CourseController');
const lessonController = require('./controllers/LessonController');

module.exports = function route (app) {
    app.route('/members/')
        .get(memberController.login)
        .post(memberController.register);

    app.use('/members/:username/', memberInfoController.middleware);

    app.route('/members/:username/')
        .get(memberInfoController.show)
        .put(memberInfoController.edit);

    app.use('/courses/', courseController.middleware);
    app.route('/courses/')
        .get(courseController.show)
        .post(courseController.create);

    app.route('/courses/:id_course/')
        .get(courseController.show)
        .put(courseController.update);
        
    app.route('/courses/:id_course/lesson/')
        .get(lessonController.show)
        .post(lessonController.create);
};
