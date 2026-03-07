import { Link, useNavigate } from "react-router-dom";
import authImage from "@/assets/signUP.jpg";
import Logo from "@/assets/Logo.png"; 
type Props = {
  onLogin: () => void;
};

export default function SignUp({ onLogin }: Props) {
  const navigate = useNavigate();
   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  console.log("Sign up success");
  onLogin(); // this tells App the user is logged in
}

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex">

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">

          <div className="w-full max-w-md">

            {/* Logo */}
            
            <div className="flex flex-col items-center mb-6">

  <img
    src={Logo}
    alt="SignBridge Logo"
    className="w-20 mb-3"
  />

  <h1 className="text-2xl font-semibold text-gray-900">
    Welcome to <span className="text-blue-600 font-bold">SignBridge</span>
  </h1>

</div>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-2">
              Create an account
            </h2>

            <p className="text-gray-500 mb-6">
              Start translating sign language today
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* First + Last */}
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
              >
                Sign Up
              </button>

            </form>

            {/* Login link */}
            <p className="text-sm text-center mt-6 text-gray-600">
              Already have an account?
              <Link to="/signIn" className="text-blue-600 ml-1 font-medium">
                Login
              </Link>
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
      <div className="w-1/2 relative hidden md:block">
<img
  src={authImage}
  alt="signup visual"
  className="absolute inset-0 w-full h-full object-cover object-center"
/>

          <div className="absolute bottom-10 left-10 text-white max-w-sm">
            <h2 className="text-4xl font-bold mb-2">
              Start Your Journey
            </h2>
            <p className=" text-1.5xl leading-relaxed">
              Create an account to access real-time translation and
              seamless communication features.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}