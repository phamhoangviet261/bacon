const memberController = require('./controllers/MemberController');
const memberInfoController = require('./controllers/MemberInfoController');
const courseController = require('./controllers/CourseController');
const lessonController = require('./controllers/LessonController');
const testController = require('./controllers/TestController');
const documentController = require('./controllers/DocumentController');

module.exports = function route (app) {
    // Table Members
    app.route('/members/')
        .get(memberController.login)
        .post(memberController.register);

    app.use('/members/:username/', memberInfoController.middleware);

    app.route('/members/:username/')
        .get(memberInfoController.show)
        .put(memberInfoController.edit);

    // Table Courses
    app.use('/courses/', courseController.middleware);
    app.route('/courses/')
        .get(courseController.show)
        .post(courseController.create);

    app.route('/courses/:id_course/')
        .get(courseController.show)
        .put(courseController.update);

    // Table Lessons
    app.route('/courses/:id_course/lessons/')
        .get(lessonController.show)
        .post(lessonController.create);

    app.route('/courses/:id_course/lessons/:id_lesson/')
        .get(lessonController.show)
        .post(lessonController.update);

    // Table Tests
    app.route('/courses/:id_course/tests/')
        .get(testController.show)
        .post(testController.create);

    app.route('/courses/:id_course/tests/:id_test/')
        .get(testController.show)
        .post(testController.update);

    // Table Documents
    app.route('/courses/:id_course/documents/')
        .get(documentController.show)
        .post(documentController.create);

    app.route('/courses/:id_course/documents/:id_document/')
        .get(documentController.show)
        .post(documentController.update);
};
