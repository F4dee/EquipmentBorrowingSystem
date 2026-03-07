import { Link } from "react-router";

export function Registration() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Registration Box */}
        <div className="bg-white border-2 border-gray-800 p-8">
          {/* Logo/Title */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-gray-300 border-2 border-gray-800 mx-auto mb-4"></div>
            <h1 className="text-center text-2xl font-bold text-gray-800">Create Account</h1>
            <p className="text-center text-sm text-gray-600 mt-1">Register for equipment borrowing</p>
          </div>

          {/* Registration Form */}
          <div className="space-y-4">
            {/* Full Name Field */}
            <div>
              <div className="text-xs text-gray-600 mb-1">FULL NAME</div>
              <div className="h-10 bg-white border-2 border-gray-800"></div>
            </div>

            {/* Student ID Field */}
            <div>
              <div className="text-xs text-gray-600 mb-1">STUDENT ID</div>
              <div className="h-10 bg-white border-2 border-gray-800"></div>
            </div>

            {/* Email Field */}
            <div>
              <div className="text-xs text-gray-600 mb-1">EMAIL ADDRESS</div>
              <div className="h-10 bg-white border-2 border-gray-800"></div>
            </div>

            {/* Password Field */}
            <div>
              <div className="text-xs text-gray-600 mb-1">PASSWORD</div>
              <div className="h-10 bg-white border-2 border-gray-800"></div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <div className="text-xs text-gray-600 mb-1">CONFIRM PASSWORD</div>
              <div className="h-10 bg-white border-2 border-gray-800"></div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-white border-2 border-gray-800 flex-shrink-0 mt-0.5"></div>
              <div className="text-sm text-gray-600">
                I agree to the Terms of Service and Privacy Policy
              </div>
            </div>

            {/* Register Button */}
            <div className="h-12 bg-gray-800 border-2 border-gray-800 flex items-center justify-center">
              <span className="text-white font-semibold">CREATE ACCOUNT</span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-gray-800 font-semibold underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
