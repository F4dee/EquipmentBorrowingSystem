import { Link } from "react-router";
import { Upload, AlertCircle } from "lucide-react";

export function ReportIssue() {
  const locations = ["Building A", "Building B", "Library", "Lab 1", "Lab 2"];
  const issueTypes = ["Hardware Malfunction", "Software Issue", "Physical Damage", "Missing Parts", "Other"];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-300 border-2 border-gray-800"></div>
              <span className="font-bold text-gray-800">Equipment System</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/catalog" className="text-sm text-gray-800 hover:underline">Catalog</Link>
              <Link to="/profile" className="text-sm text-gray-800 hover:underline">Profile</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-8 h-8 text-gray-800" />
            <h1 className="text-3xl font-bold text-gray-800">Report an Issue</h1>
          </div>
          <p className="text-gray-600">Help us maintain our equipment by reporting any problems you encounter</p>
        </div>

        {/* Form */}
        <div className="bg-white border-2 border-gray-800 p-6">
          <form className="space-y-6">
            {/* Issue Type */}
            <div>
              <div className="text-xs text-gray-600 mb-2 font-semibold">ISSUE TYPE *</div>
              <div className="h-10 bg-white border-2 border-gray-800 flex items-center px-3">
                <span className="text-sm text-gray-600">Select issue type</span>
              </div>
              <div className="mt-2 space-y-2">
                {issueTypes.map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border-2 border-gray-800 rounded-full"></div>
                    <span className="text-sm text-gray-700">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <div className="text-xs text-gray-600 mb-2 font-semibold">LOCATION *</div>
              <div className="h-10 bg-white border-2 border-gray-800 flex items-center px-3">
                <span className="text-sm text-gray-600">Select location</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {locations.map((location) => (
                  <div key={location} className="px-3 py-2 bg-gray-100 border border-gray-400 text-sm text-gray-700 text-center">
                    {location}
                  </div>
                ))}
              </div>
            </div>

            {/* PC/Equipment Number */}
            <div>
              <div className="text-xs text-gray-600 mb-2 font-semibold">PC / EQUIPMENT NUMBER *</div>
              <div className="h-10 bg-white border-2 border-gray-800 flex items-center px-3">
                <span className="text-sm text-gray-400">e.g., PC-101, EQ-042</span>
              </div>
            </div>

            {/* Equipment Name */}
            <div>
              <div className="text-xs text-gray-600 mb-2 font-semibold">EQUIPMENT NAME</div>
              <div className="h-10 bg-white border-2 border-gray-800 flex items-center px-3">
                <span className="text-sm text-gray-400">e.g., MacBook Pro, Projector</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="text-xs text-gray-600 mb-2 font-semibold">DESCRIPTION *</div>
              <div className="h-32 bg-white border-2 border-gray-800 p-3">
                <span className="text-sm text-gray-400">Please describe the issue in detail...</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Be as specific as possible to help us resolve the issue quickly</p>
            </div>

            {/* Priority */}
            <div>
              <div className="text-xs text-gray-600 mb-2 font-semibold">PRIORITY</div>
              <div className="flex gap-2">
                <div className="flex-1 h-10 bg-gray-100 border-2 border-gray-400 flex items-center justify-center text-sm text-gray-700">
                  Low
                </div>
                <div className="flex-1 h-10 bg-white border-2 border-gray-800 flex items-center justify-center text-sm font-semibold text-gray-800">
                  Medium
                </div>
                <div className="flex-1 h-10 bg-gray-100 border-2 border-gray-400 flex items-center justify-center text-sm text-gray-700">
                  High
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <div className="text-xs text-gray-600 mb-2 font-semibold">ATTACH IMAGES (OPTIONAL)</div>
              <div className="border-2 border-dashed border-gray-400 bg-gray-50 p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gray-200 border-2 border-gray-600 flex items-center justify-center mb-3">
                    <Upload className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
              </div>
              {/* Preview placeholders */}
              <div className="mt-3 grid grid-cols-4 gap-2">
                <div className="aspect-square bg-gray-200 border-2 border-gray-600"></div>
                <div className="aspect-square bg-gray-200 border-2 border-gray-600"></div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-600 mb-2 font-semibold">YOUR EMAIL</div>
                <div className="h-10 bg-gray-100 border-2 border-gray-400 flex items-center px-3">
                  <span className="text-sm text-gray-700">student@university.edu</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-2 font-semibold">PHONE (OPTIONAL)</div>
                <div className="h-10 bg-white border-2 border-gray-800 flex items-center px-3">
                  <span className="text-sm text-gray-400">+1 (555) 000-0000</span>
                </div>
              </div>
            </div>

            {/* Notice */}
            <div className="p-4 bg-gray-100 border-2 border-gray-400 flex gap-3">
              <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <span className="font-semibold">Please note:</span> We'll review your report and respond within 24 hours. 
                For urgent issues, please contact the equipment office directly.
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3">
              <button type="submit" className="flex-1 h-12 bg-gray-800 border-2 border-gray-800 text-white font-semibold hover:bg-gray-700">
                SUBMIT REPORT
              </button>
              <Link to="/catalog" className="flex-1">
                <div className="h-12 bg-white border-2 border-gray-800 text-gray-800 font-semibold hover:bg-gray-100 flex items-center justify-center">
                  CANCEL
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
