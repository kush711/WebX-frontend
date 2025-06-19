import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { getUserByName } from '../../helpers/authUtils'; // adjust path if needed

// LoginPage handles user authentication via Formik
export default function LoginPage({ darkMode }) {
  const navigate = useNavigate();

//Styling classes based on theme
  const inputClass = 'form-control my-2';
  const buttonClass = `btn ${
    darkMode ? 'btn-light text-dark' : 'btn-dark text-light'
    } mt-2`;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Login to Your Account</h2>

      <Formik
        initialValues={{ name: '', password: '', description: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.name) errors.name = 'Name is required';
          if (!values.password) errors.password = 'Password is required';
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          const user = getUserByName(values.name);

          //Handle if user ot found
          if (!user) {
            setFieldError('name', 'User not found');
            setSubmitting(false);
            return;
          }

          //Handle incorrect password
          if (user.password !== values.password) {
            setFieldError('password', 'Incorrect password');
            setSubmitting(false);
            return;
          }

          //store user session
          const sessionUser = {
            name: user.name,
            email: user.email,
            description: user.description,
            house: user.house,
            loginTime: new Date().toISOString()
            };

            localStorage.setItem('loggedInUser', JSON.stringify(sessionUser));

          setSubmitting(false);
            // redirect after login
          navigate('/dashboard'); 
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Username Field */}
            <label htmlFor="name">Username</label>
            <Field name="name" type="text" className={inputClass} />
            <ErrorMessage name="name" component="div" className="text-danger" />

            {/* Password Field */}
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" className={inputClass} />
            <ErrorMessage 
              name="password" 
              component="div" 
              className="text-danger" 
            />

            {/* Submit Button */}
            <button 
              type="submit" 
              className={buttonClass} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>

      {/* Redirect to signup */}
      <h5 className='mt-3'>Don't have an account</h5>
      <button className={buttonClass} onClick={()=> navigate('/signup')}>Sign up</button>
    </div>
  );
}
