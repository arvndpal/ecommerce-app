exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty();

    req.check("email")
        .isLength({
            min: 4,
            max: 32
        })
        .withMessage("Email must be between 4 to 32 characters.")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must be a valid email type")


    req.check("password", "Password is required.").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 characters. ")
        .matches(/\d/)
        .withMessage("Password must contain a number.")
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg);
        return res.status(400).json({ error: firstError[0] });
    }
    next();
}