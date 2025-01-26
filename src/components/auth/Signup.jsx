import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';  
import useSignup from '../../Hooks/useSignup';
import { useNavigate } from 'react-router-dom' ;

const Signup = () => {
  const { signup, loading, error } = useSignup();
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); 

  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
  });

  const onSubmit = async (values) => {
    const data = {
      name: values.name,
      username: values.email.split('@')[0],
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    };

    try {
      const result = await signup(data);
      setSuccessMessage('Signup successful! Please login to verify your account.');
      toast.success('Signup successful! Please login to verify your account.');
      navigate('/login');  
    } catch (error) {
      console.error('Signup failed:', error.message);
      toast.error(error.message || 'Signup failed! Please try again.'); // Error toast
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-medium">
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your name"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

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

          <div className="mb-4">
            <label htmlFor="passwordConfirm" className="block mb-2 font-medium">
              Confirm Password
            </label>
            <Field
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Confirm your password"
            />
            <ErrorMessage name="passwordConfirm" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md"
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
