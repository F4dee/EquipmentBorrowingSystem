import { Link } from "react-router";

export function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Box */}
        <div className="bg-white border-2 border-gray-800 p-8">
          {/* Logo/Title */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-gray-300 border-2 border-gray-800 mx-auto mb-4"></div>
            <h1 className="text-center text-2xl font-bold text-gray-800">Equipment Borrowing</h1>
            <p className="text-center text-sm text-gray-600 mt-1">Login to your account</p>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <div className="text-xs text-gray-600 mb-1">EMAIL</div>
              <div className="h-10 bg-white border-2 border-gray-800"></div>
            </div>

            {/* Password Field */}
            <div>
              <div className="text-xs text-gray-600 mb-1">PASSWORD</div>
              <div className="h-10 bg-white border-2 border-gray-800"></div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <div className="text-sm text-gray-600 underline inline-block">Forgot Password?</div>
            </div>

            {/* Login Button */}
            <div className="h-12 bg-gray-800 border-2 border-gray-800 flex items-center justify-center">
              <span className="text-white font-semibold">LOGIN</span>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-xs text-gray-600">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Login */}
            <div className="h-12 bg-white border-2 border-gray-800 flex items-center justify-center gap-2">
              <div className="w-5 h-5 bg-gray-300 border border-gray-600"></div>
              <span className="font-semibold text-gray-800">Sign in with Google</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-gray-800 font-semibold underline">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Quick Nav (for demo purposes) */}
        <div className="mt-6 p-4 bg-gray-200 border-2 border-gray-400">
          <div className="text-xs text-gray-600 mb-2 font-semibold">Quick Navigation:</div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link to="/catalog" className="underline text-gray-800">Catalog</Link>
            <Link to="/admin" className="underline text-gray-800">Admin</Link>
            <Link to="/profile" className="underline text-gray-800">Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
