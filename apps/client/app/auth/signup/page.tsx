import { SignUpForm } from "./singup-form";

const SignUp = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center ">
      <h1 className="text-center text-2xl font-bold mb-4">Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
