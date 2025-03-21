import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import type { User } from '../models/User';

// Make handleModalClose optional by adding a "?"
const LoginForm = ({ handleModalClose }: { handleModalClose?: () => void }) => {
  // State for user form data
  const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '', savedBooks: [] });
  // State for form validation
  const [validated] = useState(false);
  // State for showing alerts
  const [showAlert, setShowAlert] = useState(false);

  // Apollo useMutation hook for LOGIN_USER
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  // Handle input change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Use Apollo's useMutation to log in the user
      const { data } = await loginUser({
        variables: { email: userFormData.email, password: userFormData.password },
      });

      // If login is successful, log the user in
      if (data?.login?.token) {
        Auth.login(data.login.token);
      }

      // Close the modal if handleModalClose is provided
      if (handleModalClose) {
        handleModalClose();
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // Reset form data
    setUserFormData({
      username: '',
      email: '',
      password: '',
      savedBooks: [],
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Show alert if login fails */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;