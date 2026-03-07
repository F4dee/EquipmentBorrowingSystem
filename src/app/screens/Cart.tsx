import { Link } from "react-router";
import { Trash2, Calendar } from "lucide-react";

export function Cart() {
  const cartItems = [
    { id: 1, name: "MacBook Pro 16\"", category: "Laptop", borrowDate: "Mar 1, 2026", returnDate: "Mar 7, 2026", quantity: 1 },
    { id: 2, name: "Canon EOS R5", category: "Camera", borrowDate: "Mar 2, 2026", returnDate: "Mar 5, 2026", quantity: 1 },
    { id: 3, name: "HDMI Cable (3m)", category: "Cable", borrowDate: "Mar 1, 2026", returnDate: "Mar 7, 2026", quantity: 2 },
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
              <Link to="/catalog" className="text-sm text-gray-800 hover:underline">Continue Shopping</Link>
              <Link to="/profile" className="text-sm text-gray-800 hover:underline">Profile</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Borrowing Cart</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white border-2 border-gray-800 p-6">
                <div className="flex gap-4">
                  {/* Item Image */}
                  <div className="w-24 h-24 bg-gray-200 border-2 border-gray-600 flex items-center justify-center flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-300"></div>
                  </div>

                  {/* Item Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">{item.category.toUpperCase()}</div>
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                      </div>
                      <button className="p-2 hover:bg-gray-100">
                        <Trash2 className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">BORROW DATE</div>
                        <div className="flex items-center gap-1 text-sm text-gray-800">
                          <Calendar className="w-3 h-3" />
                          <span>{item.borrowDate}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">RETURN DATE</div>
                        <div className="flex items-center gap-1 text-sm text-gray-800">
                          <Calendar className="w-3 h-3" />
                          <span>{item.returnDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">QUANTITY:</span>
                      <div className="px-3 py-1 bg-gray-100 border border-gray-400 text-sm font-semibold">
                        {item.quantity}
                      </div>
                      <button className="text-xs text-gray-600 underline ml-2">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State (commented out) */}
            {/* <div className="bg-white border-2 border-gray-800 p-12 text-center">
              <div className="w-24 h-24 bg-gray-200 border-2 border-gray-600 mx-auto mb-4"></div>
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Link to="/catalog">
                <div className="inline-block px-6 py-3 bg-gray-800 border-2 border-gray-800 text-white font-semibold">
                  BROWSE EQUIPMENT
                </div>
              </Link>
            </div> */}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-gray-800 p-6 sticky top-6">
              <h3 className="font-bold text-gray-800 mb-4">ORDER SUMMARY</h3>

              <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-300">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Items</span>
                  <span className="text-gray-800 font-semibold">4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Borrowing Period</span>
                  <span className="text-gray-800 font-semibold">7 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pickup Location</span>
                  <span className="text-gray-800 font-semibold text-right">Building A<br/>Room 205</span>
                </div>
              </div>

              {/* Important Notice */}
              <div className="mb-6 p-3 bg-gray-100 border border-gray-400">
                <div className="text-xs font-semibold text-gray-800 mb-1">IMPORTANT</div>
                <p className="text-xs text-gray-600">
                  Please ensure you can pick up the equipment on the scheduled date. 
                  Late pickups may result in request cancellation.
                </p>
              </div>

              {/* Submit Button */}
              <Link to="/requests">
                <div className="h-12 bg-gray-800 border-2 border-gray-800 flex items-center justify-center hover:bg-gray-700 mb-3">
                  <span className="text-white font-semibold">SUBMIT REQUEST</span>
                </div>
              </Link>

              <Link to="/catalog">
                <div className="h-12 bg-white border-2 border-gray-800 flex items-center justify-center hover:bg-gray-100">
                  <span className="text-gray-800 font-semibold">CONTINUE SHOPPING</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
