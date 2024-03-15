const {Router} = require("express"),
    router = new Router(),
    {check, validationResult} = require("express-validator"),
    UserController = require("../controllers/userController"),
    auth = require("../middleware/auth"),
    ApiError = require("../exceptions/apiError"),
    TestController = require("../controllers/testController")

router.post("/register",
    [
        check("password").isLength({min: 6, max: 20}),
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw ApiError.BadRequest("Пароль должен содержать от 6 до 20 символов");
            }
            next();
        },
    ],
    UserController.registration);
router.post("/login", UserController.login);
router.get("/refresh", UserController.refresh)
router.get("/users", auth, UserController.getAllUsers);
router.get("/logout", UserController.logout);
router.post("/editprofile", UserController.editProfile);

router.post("/addtest", TestController.addTest);
router.post("/deletetest", TestController.deleteTest);
router.get("/tests", TestController.getAllTests);
router.post("/edittest", TestController.editTest);

router.post("/addquestion", TestController.addQuestion);
router.post("/getquestion", TestController.getQuestionById);
router.post("/getquestions", TestController.getAllQuestionsById);
router.get("/getallquestions", TestController.getAllQuestions);
router.post("/deletequestion", TestController.deleteQuestion);
router.post("/editquestion", TestController.editQuestion);

router.post("/sendtestresult", TestController.sendTestResult);
router.post("/gettestsresult", TestController.getTestsResult);

module.exports = router;