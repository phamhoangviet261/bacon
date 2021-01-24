const memberController = require('./controllers/MemberController');
const courseController = require('./controllers/CourseController');
const lessonController = require('./controllers/LessonController');
const testController = require('./controllers/TestController');
const questionController = require('./controllers/QuestionController');
const answerController = require('./controllers/AnswerController');
const documentController = require('./controllers/DocumentController');
const memberInfoController = require('./controllers/MemberInfoController');

// Member function
const courseSoldController = require('./controllers/CourseSoldController');
const memberAnswerController = require('./controllers/MemberAnswerController');
const memberScoreController = require('./controllers/MemberScoreController');
const reviewScoreController = require('./controllers/ReviewController');

module.exports = function route (app) {
    // Table Members
    app.route('/members/login')
        .post(memberController.login);
    app.route('/members/register')
        .post(memberController.register);

    app.route('/members/:username/')
        .get(memberInfoController.show)
        .put(memberInfoController.edit);

    // Table Courses
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
        .get(answerController.show);

    app.route('/courses/:id_course/tests/:id_test/questions/:id_question/answers/:id_answer')
        .get(answerController.show)
        .post(answerController.update);

    // Table CoursesSold
    app.route('/members/:id_member/courses/')
        .get(courseSoldController.show)
        .post(courseSoldController.register);
    app.route('/members/:id_member/courses/:id_courses')
        .get(courseSoldController.show)
        .post(courseSoldController.update);

    // Table MembersAnswer
    app.route('/members/:id_member/question/')
        .get(memberAnswerController.show)
        .post(memberAnswerController.create);

    app.route('/members/:id_member/question/:id_question')
        .get(memberAnswerController.show)
        .post(memberAnswerController.update);

    // Table MembersScore
    app.route('/members/:id_member/tests/')
        .get(memberScoreController.show);

    app.route('/members/:id_member/tests/:id_test')
        .get(memberScoreController.show);

    // Table Review
    app.route('/members/:id_member/reviews')
        .get(reviewScoreController.show)
        .post(reviewScoreController.create);

    app.route('/members/:id_member/reviews/:id_course')
        .get(reviewScoreController.show)
        .post(reviewScoreController.update);
};
