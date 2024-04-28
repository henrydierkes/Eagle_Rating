### User Authentication System Components

[//]: # (![image]&#40;https://github.com/bianshuyang/LabLink/assets/52821055/67d7d032-6d93-45ed-b16f-f5f5ec5f0f43&#41;)


#### 1. New User Registration
- **Register Component**: This serves as the initial step for new users to set up an account, where they must enter their registration information to be processed by the system.
- **VerifyUser Component**: Once registration details are submitted, they are processed by this component. At this time, you will be prompted and restricted to only email addresses with the suffix "@emory.edu" that can register.
- **NewUserVerify Component**: Between these two stages, a verification email is dispatched, sending a code to the user to confirm ownership of the email address. Completion of this step is necessary to proceed.
- Case: **Skipping Verification**: Should a user attempt to log in without having completed the verification process, the system will prevent the login. An alert will be displayed, and the user will be redirected to the registration component.

#### 2. User Login
- **Login Component**: This is the standard login interface for users who have completed the registration and verification processes. Users must enter their credentials to access their accounts.


### Function Explanations for SignIn Component

### `handleSubmit`

This function is triggered when the sign-in form is submitted.

- It prevents the default form submission action using `event.preventDefault()`.
- It attempts to send a POST request to the sign-in endpoint with the email and password.
- If the request is successful, it updates the auth context with the response data and navigates to the home page.
- In case of failure, it sets an error state to display an error message.

### `navigateToFrontPage`

This function is used to navigate the user back to the front page.

- It calls the `navigate` function from `useNavigate` hook with `'/'` as the path.

### `useEffect`

This effect sets up pointer event listeners on the window object.

- It listens for `pointermove` and `pointerdown` events.
- When these events occur, it sets a CSS variable `--y` on the root element to the pageY position of the pointer.
- It cleans up the event listeners when the component is unmounted.

### Custom Styles with `sx` Prop

In various components like `Box` and `Typography`, the `sx` prop is used to apply inline styles.

- Styles are applied using the `sx` prop which takes an object of style properties.
- This allows for dynamic styling based on the theme, responsive values, and more.


### Function Explanations for SignUp Component

### `isValidEmail`

This function checks if the provided email is a valid Emory University email address.

- Utilizes a regular expression to test the email string against the required `emory.edu` domain pattern.
- Returns a boolean indicating validity.

### `handleSubmit`

This function is called when the sign-up form is submitted.

- It first prevents the default submission action.
- Then, it validates the email using the `isValidEmail` function.
- If the email is valid, it sends a POST request to create a new user account.
- If account creation is successful, it sets a cookie with the email and redirects to the verification page.
- In the case of an error, it sets the error state to display the appropriate message.

### `useEffect`

This effect is used to attach custom pointer event listeners to the window object.

- It adds `pointermove` and `pointerdown` event listeners to dynamically set a CSS variable on the `:root` element based on the pointer's position.
- It also ensures the removal of these event listeners on component unmount to prevent memory leaks.

### `ThemeProvider`

Encapsulates the entire component to provide a theme context.

- This is where the `defaultTheme` is applied to all children components, ensuring consistent theming.
- Any `sx` props within children will reference values from `defaultTheme`.

