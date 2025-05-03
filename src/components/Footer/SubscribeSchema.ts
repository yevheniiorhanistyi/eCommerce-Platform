import * as Yup from 'yup';

const SubscribeSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Enter a valid email (user@example.com)')
    .matches(/^.+@.+\..+$/, 'Email address must contain a domain name')
    .required('Email is required')
});

export default SubscribeSchema;
