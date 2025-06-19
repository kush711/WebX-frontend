import { Formik, Form, Field, ErrorMessage } from 'formik';
import { saveUserToStorage, isUserExists } from '../../helpers/authUtils';
import { useNavigate } from 'react-router-dom';

// SignupPage component for user registration
export default function SignupPage({ darkMode }) {
  const navigate = useNavigate();

// Theme-based styling classes
  const inputClass = 'form-control my-2';
  const buttonClass = `btn ${darkMode ? 'btn-light text-dark' : 'btn-dark text-light'} mt-2`;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Sign Up to enter Dashboard</h2>

      <Formik
        initialValues={{ 
          name: '',
          email: '', 
          password: '', 
          description: '' 
        }}
        validate={(values) => {
          const errors = {};

          //Username validation
          if (!values.name) {
            errors.name = 'Username is required';
          } else if (isUserExists(values.name)) {
            errors.name = 'Username already exists';
          }

          //Email validation
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          //Password validation
          if (!values.password) {
            errors.password = 'Password is required';
          } else if (values.password.length < 6) {
            errors.password = 'Minimum 6 characters';
          }

          //Description validation
          if(!values.description){
            errors.description = 'A short Description is required';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          try {
            console.log("Signup values:", values);
            
            //Save user to localStorage
            saveUserToStorage(values);           
            
            navigate('/login');
          } catch (err) {
            console.error("Signup error:", err);  
          } finally {
            setSubmitting(false);           
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="name">Username</label>
            <Field type="text" name="name" className={inputClass} />
            <ErrorMessage name="name" component="div" className="text-danger" />

            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className={inputClass} />
            <ErrorMessage name="email" component="div" className="text-danger" />

            <label htmlFor="password">Password</label>
            <Field type="password" name="password" className={inputClass} />
            <ErrorMessage name="password" component="div" className="text-danger" />

            <label htmlFor="description">Description</label>
            <Field as="textarea" name="description" rows="3" className={inputClass} />
            <ErrorMessage name="description" component="div" className="text-danger" />

            <button type="submit" className={buttonClass} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>

      {/* //Navigate to login if account already exists */}
      <h5 className='mt-3'>Have an account</h5>
      <button className={buttonClass} onClick={()=> navigate('/login')}>Login</button>
    </div>
  );
}
