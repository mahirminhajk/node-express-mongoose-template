const createEmailChain = () => body('email').isEmail();
app.post('/login', createEmailChain(), handleLoginRoute);
app.post('/signup', createEmailChain().custom(checkEmailNotInUse), handleSignupRoute);

checkSchema({
    username: {
        errorMessage: 'Invalid username',
        isEmail: true,
    },
    password: {
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
        },
    },
});

const { checkSchema } = require('express-validator');

const userSchema = checkSchema({
    name: {
        in: ['body'], // Specify location (body, query, params, headers, cookies)
        notEmpty: true, // Require the field to have a value
        errorMessage: 'Name is required',
    },
    email: {
        in: ['body'],
        isEmail: true,
        errorMessage: 'Invalid email format',
    },
    age: {
        in: ['body'],
        isInt: { min: 18, max: 120 }, // Validate as an integer within a range
        errorMessage: 'Age must be a number between 18 and 120',
    },
});

app.post('/users', checkSchema(userSchema), async (req, res) => {
    // ... your route logic
});
