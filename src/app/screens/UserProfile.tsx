import { Link } from "react-router";
import { User, Mail, Phone, Calendar, Package, Clock, CheckCircle, Settings } from "lucide-react";

export function UserProfile() {
  const borrowingHistory = [
    { 
      id: "REQ-045", 
      items: ["MacBook Pro 16\"", "USB-C Cable"], 
      borrowDate: "Mar 1, 2026", 
      returnDate: "Mar 7, 2026", 
      status: "Active" 
    },
    { 
      id: "REQ-038", 
      items: ["Canon EOS R5"], 
      borrowDate: "Feb 20, 2026", 
      returnDate: "Feb 27, 2026", 
      status: "Completed" 
    },
    { 
      id: "REQ-032", 
      items: ["iPad Pro 12.9\"", "Apple Pencil"], 
      borrowDate: "Feb 10, 2026", 
      returnDate: "Feb 17, 2026", 
      status: "Completed" 
    },
    { 
      id: "REQ-025", 
      items: ["BenQ Projector", "HDMI Cable"], 
      borrowDate: "Jan 28, 2026", 
      returnDate: "Feb 4, 2026", 
      status: "Completed" 
    },
  ];

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
              <Link to="/cart" className="text-sm text-gray-800 hover:underline">Cart</Link>
              <Link to="/requests" className="text-sm text-gray-800 hover:underline">My Requests</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">User Profile</h1>
          <p className="text-gray-600">Manage your account and view borrowing history</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-gray-800 p-6">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 bg-gray-300 border-2 border-gray-800 rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-600" />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-1">John Smith</h2>
                <p className="text-sm text-gray-600">Student ID: STU-2024-001</p>
              </div>

              {/* Contact Details */}
              <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">john.smith@university.edu</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Joined: Jan 15, 2024</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button className="w-full h-10 bg-gray-800 border-2 border-gray-800 text-white font-semibold hover:bg-gray-700 flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </button>
                <Link to="/" className="block">
                  <div className="w-full h-10 bg-white border-2 border-gray-800 text-gray-800 font-semibold hover:bg-gray-100 flex items-center justify-center">
                    Sign Out
                  </div>
                </Link>
              </div>
            </div>

            {/* Account Status */}
            <div className="mt-4 bg-white border-2 border-gray-800 p-4">
              <h3 className="text-xs font-semibold text-gray-600 mb-3">ACCOUNT STATUS</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-2 py-1 bg-gray-800 text-white text-xs font-semibold border border-gray-900">
                    ACTIVE
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Reputation:</span>
                  <span className="text-gray-800 font-semibold">Excellent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border-2 border-gray-800 p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Package className="w-8 h-8 text-gray-800" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">15</div>
                <div className="text-xs text-gray-600">Total Borrows</div>
              </div>
              <div className="bg-white border-2 border-gray-800 p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="w-8 h-8 text-gray-800" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">2</div>
                <div className="text-xs text-gray-600">Active Requests</div>
              </div>
              <div className="bg-white border-2 border-gray-800 p-4 text-center">
                <div className="flex justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-gray-800" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">13</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
            </div>

            {/* Borrowing History */}
            <div className="bg-white border-2 border-gray-800">
              <div className="px-5 py-4 border-b-2 border-gray-800 flex items-center justify-between">
                <h2 className="font-bold text-gray-800">Borrowing History</h2>
                <Link to="/requests" className="text-sm text-gray-600 hover:underline">View All</Link>
              </div>

              <div className="p-5 space-y-4">
                {borrowingHistory.map((record) => (
                  <div key={record.id} className="p-4 bg-gray-50 border border-gray-400">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">{record.id}</h3>
                        <div className="text-xs text-gray-600">
                          {record.borrowDate} → {record.returnDate}
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold border-2 ${
                        record.status === "Active" 
                          ? "bg-gray-800 text-white border-gray-900" 
                          : "bg-gray-200 border-gray-600"
                      }`}>
                        {record.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {record.items.map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-700">• {item}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border-2 border-gray-800 p-5">
              <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/catalog">
                  <div className="h-12 bg-white border-2 border-gray-800 flex items-center justify-center hover:bg-gray-100">
                    <span className="text-sm font-semibold text-gray-800">Browse Equipment</span>
                  </div>
                </Link>
                <Link to="/requests">
                  <div className="h-12 bg-white border-2 border-gray-800 flex items-center justify-center hover:bg-gray-100">
                    <span className="text-sm font-semibold text-gray-800">My Requests</span>
                  </div>
                </Link>
                <Link to="/report">
                  <div className="h-12 bg-white border-2 border-gray-800 flex items-center justify-center hover:bg-gray-100">
                    <span className="text-sm font-semibold text-gray-800">Report Issue</span>
                  </div>
                </Link>
                <button className="h-12 bg-gray-800 border-2 border-gray-800 flex items-center justify-center hover:bg-gray-700">
                  <span className="text-sm font-semibold text-white">Download History</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
