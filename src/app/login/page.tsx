import LoginForm from './LoginForm';

const Login = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center px-4 sm:px-4 md:px-8">
      <div className="w-full max-w-md bg-white px-6 sm:px-10 py-6 sm:py-8 shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to StepUp</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
