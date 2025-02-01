import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Login failed! Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <div className=" mb-2 text-right">
              <Link to="/forgot-password" className="text-blue-600 underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="my-2 text-left font-normal">
            If You Don't Have an account please {" "}
              <Link  to="/signup" className="text-blue-600  underline">
               Sign Up              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
