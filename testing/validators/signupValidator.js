import * as yup from 'yup';

let schema = yup.object().shape({
    name: yup.string()
        .required(),
    password: yup.string()
        .required("Password is required.")
        .min(5, "Password must be at least 5 characters long.")
        .max(8, "Password must be at most 8 characters long.")
        .matches(/\d/, "Password must not contain spaces"),
    email: yup.string()
        .required("Email is required.")
        .min(5, "Email must be at least 5 characters long.")
        .max(20, "Email must be at most 20 characters long.")
        .matches(/.+\@.+\..+/, "Email must be a valid email address"),
});

export const signupValidator = async (req, res, next) => {
    console.log("in signupValidator", req.body);

    try {
        await schema.validate(req.body);
        next();
    } catch (err) {
        res.status(400).json({

            message: err.message,
            errors: err.errors,
        });
    }
}