import { Link } from "react-router";
import { Calendar, Package } from "lucide-react";

export function MyRequests() {
  const tabs = ["All", "Pending", "Approved", "Active", "Completed", "Rejected"];
  
  const requests = [
    { 
      id: "REQ-001", 
      status: "Pending", 
      items: 2, 
      borrowDate: "Mar 1, 2026", 
      returnDate: "Mar 7, 2026",
      submittedDate: "Feb 28, 2026",
      itemNames: ["MacBook Pro 16\"", "USB-C Cable"]
    },
    { 
      id: "REQ-002", 
      status: "Approved", 
      items: 1, 
      borrowDate: "Mar 5, 2026", 
      returnDate: "Mar 12, 2026",
      submittedDate: "Feb 27, 2026",
      itemNames: ["Canon EOS R5"]
    },
    { 
      id: "REQ-003", 
      status: "Active", 
      items: 3, 
      borrowDate: "Feb 25, 2026", 
      returnDate: "Mar 3, 2026",
      submittedDate: "Feb 24, 2026",
      itemNames: ["Projector BenQ", "HDMI Cable", "Power Strip"]
    },
    { 
      id: "REQ-004", 
      status: "Completed", 
      items: 1, 
      borrowDate: "Feb 15, 2026", 
      returnDate: "Feb 22, 2026",
      submittedDate: "Feb 14, 2026",
      itemNames: ["iPad Pro 12.9\""]
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-gray-300 border-gray-500";
      case "Approved": return "bg-gray-200 border-gray-600";
      case "Active": return "bg-gray-800 text-white border-gray-800";
      case "Completed": return "bg-gray-400 border-gray-600";
      case "Rejected": return "bg-gray-200 border-gray-700";
      default: return "bg-gray-200 border-gray-600";
    }
  };

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
              <Link to="/profile" className="text-sm text-gray-800 hover:underline">Profile</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Requests</h1>
          <p className="text-gray-600">Track and manage your equipment borrowing requests</p>
        </div>

        {/* Tabs */}
        <div className="bg-white border-2 border-gray-800 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                className={`px-6 py-3 text-sm font-semibold whitespace-nowrap border-r-2 border-gray-800 last:border-r-0 ${
                  idx === 0 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-white border-2 border-gray-800 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 border-2 border-gray-600 flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{request.id}</h3>
                    <p className="text-xs text-gray-600">Submitted: {request.submittedDate}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 border-2 text-sm font-semibold ${getStatusColor(request.status)}`}>
                  {request.status.toUpperCase()}
                </div>
              </div>

              {/* Items */}
              <div className="mb-4 pb-4 border-b-2 border-gray-300">
                <div className="text-xs text-gray-600 mb-2">ITEMS ({request.items})</div>
                <div className="space-y-1">
                  {request.itemNames.map((item, idx) => (
                    <div key={idx} className="text-sm text-gray-800">• {item}</div>
                  ))}
                </div>
              </div>

              {/* Dates & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-6">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">BORROW DATE</div>
                    <div className="flex items-center gap-1 text-sm text-gray-800">
                      <Calendar className="w-3 h-3" />
                      <span>{request.borrowDate}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">RETURN DATE</div>
                    <div className="flex items-center gap-1 text-sm text-gray-800">
                      <Calendar className="w-3 h-3" />
                      <span>{request.returnDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border-2 border-gray-800 text-sm font-semibold text-gray-800 hover:bg-gray-100">
                    VIEW DETAILS
                  </button>
                  {request.status === "Pending" && (
                    <button className="px-4 py-2 bg-gray-200 border-2 border-gray-600 text-sm font-semibold text-gray-800 hover:bg-gray-300">
                      CANCEL
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (commented out) */}
        {/* <div className="bg-white border-2 border-gray-800 p-12 text-center">
          <div className="w-24 h-24 bg-gray-200 border-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600 mb-4">No requests found</p>
          <Link to="/catalog">
            <div className="inline-block px-6 py-3 bg-gray-800 border-2 border-gray-800 text-white font-semibold">
              BROWSE EQUIPMENT
            </div>
          </Link>
        </div> */}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center gap-2">
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
            <span className="text-gray-600">&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
