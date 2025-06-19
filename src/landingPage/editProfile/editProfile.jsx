import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// EditProfile allows users to update their profile description
export default function EditProfile({darkMode}){
    const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // On component mount, check if the user is logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const inputClass = 'form-control my-2';
  const buttonClass = `btn ${
    darkMode ? 'btn-light text-dark' : 'btn-dark text-light'
  } mt-2`;

   // Don't render form until user is loaded
  if (!user) return null;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Edit Your Profile</h2>

      <Formik
        initialValues={{ description: user.description || '' }}
        validate={(values) => {
          const errors = {};
          if (!values.description) {
            errors.description = 'Description is required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          try {
            const updatedUser = { ...user, description: values.description };
            localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUsers = users.map(u =>
              u.name === user.name ? { ...u, description: values.description } : u
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            toast.success('Profile updated successfully!');
            navigate('/dashboard');
          } catch (error) {
            toast.error('Something went wrong while updating your profile.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="description">New Description</label>
            <Field 
              as="textarea" 
              name="description" 
              rows="4" 
              className={inputClass} 
            />
            <ErrorMessage 
              name="description" 
              component="div" 
              className="text-danger" 
            />

            <button 
              type="submit" 
              className={buttonClass} 
              disabled={isSubmitting}
              >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </Form>
        )}
      </Formik>

      <button className={`btn ${buttonClass} mt-3`} onClick={() => navigate('/dashboard')}>
        Cancel
      </button>
    </div>
    )
}