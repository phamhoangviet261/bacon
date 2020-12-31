const memberController = require('./controllers/MemberController');
const memberInfoController = require('./controllers/MemberInfoController');
const courseController = require('./controllers/CourseController');
const lessonController = require('./controllers/LessonController');
const testController = require('./controllers/TestController');
const questionController = require('./controllers/QuestionController');
const answerController = require('./controllers/AnswerController');
const documentController = require('./controllers/DocumentController');

// Member function
const courseSold = require('./controllers/CourseSoldController');

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

    // Table Questions
    app.route('/courses/:id_course/tests/:id_test/questions')
        .get(questionController.show)
        .post(questionController.create);

    app.route('/courses/:id_course/tests/:id_test/questions/:id_question')
        .get(questionController.show)
        .post(questionController.update);

    // Table Answer
    app.route('/courses/:id_course/tests/:id_test/questions/:id_question/answers')
        .get(answerController.show)
        .post(answerController.create);

    app.route('/courses/:id_course/tests/:id_test/questions/:id_question/answers/:id_answer')
        .get(answerController.show)
        .post(answerController.update);

    // Table CoursesSold
    app.route('/members/:id_member/courses/')
        .get(courseSold.show)
        .post(courseController.register);
    app.route('/members/:id_member/courses/:id_courses')
        .get(courseSold.show);
};
