import { BACKEND_URL } from "@/lib/constants";
import { SignInForm } from "./_components/signin-form";

const SignIn = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center ">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In</h1>
      <a
        className="border px-4 py-2 rounded bg-sky-600 text-white"
        href={`${BACKEND_URL}/auth/google/login`}
      >
        Sign In With Google
      </a>

      <SignInForm />
    </div>
  );
};

export default SignIn;
