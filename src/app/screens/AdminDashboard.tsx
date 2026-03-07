import { Link } from "react-router";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  AlertCircle, 
  Users, 
  Settings,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

export function AdminDashboard() {
  const stats = [
    { label: "Total Equipment", value: "248", icon: Package, color: "bg-gray-800" },
    { label: "Active Requests", value: "32", icon: Clock, color: "bg-gray-700" },
    { label: "Completed Today", value: "15", icon: CheckCircle, color: "bg-gray-600" },
    { label: "Open Tickets", value: "8", icon: AlertCircle, color: "bg-gray-500" },
  ];

  const recentRequests = [
    { id: "REQ-045", user: "John Smith", items: 2, status: "Pending", date: "Feb 28, 2026" },
    { id: "REQ-044", user: "Sarah Johnson", items: 1, status: "Approved", date: "Feb 28, 2026" },
    { id: "REQ-043", user: "Mike Chen", items: 3, status: "Active", date: "Feb 27, 2026" },
    { id: "REQ-042", user: "Emma Wilson", items: 1, status: "Pending", date: "Feb 27, 2026" },
  ];

  const recentTickets = [
    { id: "TKT-128", issue: "Laptop won't power on", location: "Lab 1 - PC-042", priority: "High", status: "Open" },
    { id: "TKT-127", issue: "Broken HDMI port", location: "Building A - EQ-015", priority: "Medium", status: "In Progress" },
    { id: "TKT-126", issue: "Missing power adapter", location: "Library - PC-089", priority: "Low", status: "Resolved" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-800 border-b-2 border-gray-900">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-600 border-2 border-gray-900"></div>
              <span className="font-bold text-white">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">Admin User</span>
              <div className="w-8 h-8 bg-gray-600 border-2 border-gray-400"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r-2 border-gray-800 min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              <Link to="/admin">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white border-2 border-gray-800">
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="font-semibold">Dashboard</span>
                </div>
              </Link>
              <Link to="/admin/inventory">
                <div className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 hover:bg-gray-100">
                  <Package className="w-5 h-5 text-gray-800" />
                  <span className="text-gray-800">Inventory</span>
                </div>
              </Link>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 hover:bg-gray-100">
                <FileText className="w-5 h-5 text-gray-800" />
                <span className="text-gray-800">Requests</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 hover:bg-gray-100">
                <AlertCircle className="w-5 h-5 text-gray-800" />
                <span className="text-gray-800">Tickets</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 hover:bg-gray-100">
                <Users className="w-5 h-5 text-gray-800" />
                <span className="text-gray-800">Users</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 hover:bg-gray-100">
                <Settings className="w-5 h-5 text-gray-800" />
                <span className="text-gray-800">Settings</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
            <p className="text-gray-600">Overview of equipment borrowing system</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white border-2 border-gray-800 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 ${stat.color} border-2 border-gray-900 flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Requests */}
            <div className="bg-white border-2 border-gray-800">
              <div className="px-5 py-4 border-b-2 border-gray-800 flex items-center justify-between">
                <h2 className="font-bold text-gray-800">Recent Requests</h2>
                <button className="text-sm text-gray-600 hover:underline">View All</button>
              </div>
              <div className="p-5">
                <div className="space-y-3">
                  {recentRequests.map((request) => (
                    <div key={request.id} className="p-4 bg-gray-50 border border-gray-400">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-800">{request.id}</span>
                        <span className={`px-2 py-1 text-xs font-semibold border ${
                          request.status === "Pending" ? "bg-gray-200 border-gray-600" :
                          request.status === "Approved" ? "bg-gray-300 border-gray-700" :
                          "bg-gray-800 text-white border-gray-900"
                        }`}>
                          {request.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 mb-1">{request.user}</div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{request.items} items</span>
                        <span>{request.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Tickets */}
            <div className="bg-white border-2 border-gray-800">
              <div className="px-5 py-4 border-b-2 border-gray-800 flex items-center justify-between">
                <h2 className="font-bold text-gray-800">Recent Tickets</h2>
                <button className="text-sm text-gray-600 hover:underline">View All</button>
              </div>
              <div className="p-5">
                <div className="space-y-3">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 bg-gray-50 border border-gray-400">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-800">{ticket.id}</span>
                        <span className={`px-2 py-1 text-xs font-semibold border ${
                          ticket.priority === "High" ? "bg-gray-700 text-white border-gray-900" :
                          ticket.priority === "Medium" ? "bg-gray-300 border-gray-600" :
                          "bg-gray-100 border-gray-400"
                        }`}>
                          {ticket.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-800 font-semibold mb-1">{ticket.issue}</div>
                      <div className="text-xs text-gray-600 mb-2">{ticket.location}</div>
                      <div className="text-xs text-gray-600">Status: {ticket.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Table */}
          <div className="mt-6 bg-white border-2 border-gray-800">
            <div className="px-5 py-4 border-b-2 border-gray-800">
              <h2 className="font-bold text-gray-800">Today's Activity</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-800">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-800">TIME</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-800">ACTION</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-800">USER</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-800">DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="px-5 py-3 text-sm text-gray-600">10:45 AM</td>
                    <td className="px-5 py-3 text-sm text-gray-800">Request Approved</td>
                    <td className="px-5 py-3 text-sm text-gray-800">Sarah Johnson</td>
                    <td className="px-5 py-3 text-sm text-gray-600">REQ-044 - 1 item</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-5 py-3 text-sm text-gray-600">10:23 AM</td>
                    <td className="px-5 py-3 text-sm text-gray-800">Equipment Returned</td>
                    <td className="px-5 py-3 text-sm text-gray-800">Alex Martinez</td>
                    <td className="px-5 py-3 text-sm text-gray-600">REQ-038 - 2 items</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-5 py-3 text-sm text-gray-600">09:15 AM</td>
                    <td className="px-5 py-3 text-sm text-gray-800">New Request</td>
                    <td className="px-5 py-3 text-sm text-gray-800">John Smith</td>
                    <td className="px-5 py-3 text-sm text-gray-600">REQ-045 - 2 items</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
