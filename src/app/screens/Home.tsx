import { Bell, User as UserIcon, TrendingUp, Clock, CheckCircle, AlertCircle as AlertIcon } from "lucide-react";

export function Home() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
  
  const stats = [
    { label: 'Active Requests', value: '32', icon: Clock, color: 'bg-blue-600' },
    { label: 'Completed Today', value: '15', icon: CheckCircle, color: 'bg-green-600' },
    { label: 'Open Tickets', value: '8', icon: AlertIcon, color: 'bg-orange-500' },
  ];

  const recentRequests = [
    { id: 'REQ-045', user: 'John Smith', items: 2, status: 'PENDING', date: 'Feb 28, 2026', statusColor: 'bg-yellow-500' },
    { id: 'REQ-044', user: 'Sarah Johnson', items: 1, status: 'APPROVED', date: 'Feb 28, 2026', statusColor: 'bg-green-500' },
    { id: 'REQ-043', user: 'Mike Chen', items: 3, status: 'BORROWED', date: 'Feb 27, 2026', statusColor: 'bg-blue-500' },
  ];

  const recentTickets = [
    { id: 'TKT-128', priority: 'HIGH', issue: 'Laptop won\'t power on', location: 'Lab 1 - PC-042', status: 'OPEN', priorityColor: 'bg-red-500' },
    { id: 'TKT-127', priority: 'MEDIUM', issue: 'Broken HDMI port', location: 'Building A - EQ-015', status: 'IN PROGRESS', priorityColor: 'bg-orange-500' },
    { id: 'TKT-126', priority: 'LOW', issue: 'Mouse not working', location: 'Lab 3 - PC-128', status: 'OPEN', priorityColor: 'bg-green-500' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{greeting}, Admin User</h1>
          <p className="text-sm text-gray-500 mt-1">Monday, March 2, 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Requests</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="p-6 space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{request.id}</span>
                    <span className={`w-2 h-2 ${request.statusColor} rounded-full`}></span>
                    <span className="text-xs font-medium text-gray-600 uppercase">{request.status}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-700 mb-1">{request.user}</div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{request.items} items</span>
                  <span>{request.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Tickets</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="p-6 space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{ticket.id}</span>
                    <span className={`w-2 h-2 ${ticket.priorityColor} rounded-full`}></span>
                    <span className="text-xs font-medium text-gray-600 uppercase">{ticket.priority}</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">{ticket.issue}</div>
                <div className="text-xs text-gray-600 mb-2">{ticket.location}</div>
                <div className="text-xs text-gray-500">Status: {ticket.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
