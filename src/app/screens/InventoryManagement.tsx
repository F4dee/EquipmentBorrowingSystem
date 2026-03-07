import { Link } from "react-router";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  AlertCircle, 
  Users, 
  Settings,
  Plus,
  Search,
  Edit,
  Trash2,
  Filter
} from "lucide-react";

export function InventoryManagement() {
  const equipment = [
    { id: "EQ-001", name: "MacBook Pro 16\"", category: "Laptop", status: "Available", quantity: 12, total: 15, condition: "Excellent" },
    { id: "EQ-002", name: "Canon EOS R5", category: "Camera", status: "Available", quantity: 3, total: 5, condition: "Good" },
    { id: "EQ-003", name: "iPad Pro 12.9\"", category: "Tablet", status: "On Loan", quantity: 0, total: 8, condition: "Excellent" },
    { id: "EQ-004", name: "BenQ Projector", category: "Projector", status: "Available", quantity: 5, total: 6, condition: "Good" },
    { id: "EQ-005", name: "Sony WH-1000XM5", category: "Audio", status: "Maintenance", quantity: 0, total: 10, condition: "Fair" },
    { id: "EQ-006", name: "HDMI Cable 3m", category: "Cable", status: "Available", quantity: 45, total: 50, condition: "Good" },
    { id: "EQ-007", name: "USB-C Hub", category: "Adapter", status: "Available", quantity: 18, total: 20, condition: "Excellent" },
    { id: "EQ-008", name: "Logitech C920", category: "Webcam", status: "Available", quantity: 7, total: 10, condition: "Good" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-gray-800 text-white border-gray-900";
      case "On Loan": return "bg-gray-300 border-gray-600";
      case "Maintenance": return "bg-gray-500 text-white border-gray-700";
      default: return "bg-gray-200 border-gray-600";
    }
  };

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
                <div className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 hover:bg-gray-100">
                  <LayoutDashboard className="w-5 h-5 text-gray-800" />
                  <span className="text-gray-800">Dashboard</span>
                </div>
              </Link>
              <Link to="/admin/inventory">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white border-2 border-gray-800">
                  <Package className="w-5 h-5" />
                  <span className="font-semibold">Inventory</span>
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Inventory Management</h1>
              <p className="text-gray-600">Manage equipment and stock levels</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 border-2 border-gray-900 text-white font-semibold hover:bg-gray-700">
              <Plus className="w-5 h-5" />
              Add Equipment
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border-2 border-gray-800 p-4">
              <div className="text-sm text-gray-600 mb-1">Total Items</div>
              <div className="text-2xl font-bold text-gray-800">248</div>
            </div>
            <div className="bg-white border-2 border-gray-800 p-4">
              <div className="text-sm text-gray-600 mb-1">Available</div>
              <div className="text-2xl font-bold text-gray-800">189</div>
            </div>
            <div className="bg-white border-2 border-gray-800 p-4">
              <div className="text-sm text-gray-600 mb-1">On Loan</div>
              <div className="text-2xl font-bold text-gray-800">51</div>
            </div>
            <div className="bg-white border-2 border-gray-800 p-4">
              <div className="text-sm text-gray-600 mb-1">Maintenance</div>
              <div className="text-2xl font-bold text-gray-800">8</div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white border-2 border-gray-800 p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <div className="h-10 bg-white border-2 border-gray-800 flex items-center px-3">
                    <Search className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-400">Search equipment...</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-800 text-gray-800 font-semibold hover:bg-gray-100">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <div className="w-48 h-10 bg-white border-2 border-gray-800 flex items-center px-3">
                <span className="text-sm text-gray-600">All Categories</span>
              </div>
              <div className="w-40 h-10 bg-white border-2 border-gray-800 flex items-center px-3">
                <span className="text-sm text-gray-600">All Status</span>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white border-2 border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-800">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-800">ID</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-800">NAME</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-800">CATEGORY</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-800">STATUS</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-800">AVAILABLE</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-800">TOTAL</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-800">CONDITION</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-800">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((item) => (
                    <tr key={item.id} className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="px-5 py-4 text-sm text-gray-600 font-mono">{item.id}</td>
                      <td className="px-5 py-4 text-sm text-gray-800 font-semibold">{item.name}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{item.category}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold border-2 ${getStatusColor(item.status)}`}>
                          {item.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 font-semibold">{item.quantity}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{item.total}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{item.condition}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 border border-gray-400">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 border border-gray-400">
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-5 py-4 border-t-2 border-gray-800 flex items-center justify-between">
              <div className="text-sm text-gray-600">Showing 1-8 of 248 items</div>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-gray-300 border-2 border-gray-600 flex items-center justify-center">
                  <span className="text-gray-600">&lt;</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 border-2 border-gray-800 flex items-center justify-center">
                  <span className="text-white font-semibold">1</span>
                </div>
                <div className="w-10 h-10 bg-white border-2 border-gray-800 flex items-center justify-center">
                  <span className="text-gray-800">2</span>
                </div>
                <div className="w-10 h-10 bg-white border-2 border-gray-800 flex items-center justify-center">
                  <span className="text-gray-800">3</span>
                </div>
                <div className="w-10 h-10 bg-white border-2 border-gray-800 flex items-center justify-center">
                  <span className="text-gray-600">...</span>
                </div>
                <div className="w-10 h-10 bg-white border-2 border-gray-800 flex items-center justify-center">
                  <span className="text-gray-800">31</span>
                </div>
                <div className="w-10 h-10 bg-white border-2 border-gray-800 flex items-center justify-center">
                  <span className="text-gray-600">&gt;</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
