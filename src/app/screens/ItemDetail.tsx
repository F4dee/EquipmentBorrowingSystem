import { Link } from "react-router";
import { ArrowLeft, Calendar, Plus, Minus } from "lucide-react";

export function ItemDetail() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/catalog" className="flex items-center gap-2 text-gray-800 hover:text-gray-600">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Catalog</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white border-2 border-gray-800">
            <div className="aspect-square bg-gray-200 border-b-2 border-gray-800 flex items-center justify-center">
              <div className="w-64 h-64 bg-gray-300 border-2 border-gray-600"></div>
            </div>
            {/* Thumbnail Gallery */}
            <div className="p-4 flex gap-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="w-20 h-20 bg-gray-200 border-2 border-gray-600 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="bg-white border-2 border-gray-800 p-6 mb-4">
              {/* Title & Badge */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-3 py-1 bg-gray-200 border border-gray-600 text-xs font-semibold">
                    AVAILABLE
                  </div>
                  <span className="text-xs text-gray-600">ID: EQ-001</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">MacBook Pro 16"</h1>
                <p className="text-gray-600">Professional laptop for development and design work</p>
              </div>

              {/* Specifications */}
              <div className="mb-6 pb-6 border-b-2 border-gray-300">
                <h3 className="text-xs font-semibold text-gray-600 mb-3">SPECIFICATIONS</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processor:</span>
                    <span className="text-gray-800 font-semibold">M2 Pro</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Memory:</span>
                    <span className="text-gray-800 font-semibold">32GB RAM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage:</span>
                    <span className="text-gray-800 font-semibold">1TB SSD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Condition:</span>
                    <span className="text-gray-800 font-semibold">Excellent</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-600 mb-2">PICKUP LOCATION</h3>
                <div className="p-3 bg-gray-100 border border-gray-400 text-sm text-gray-800">
                  Building A, Room 205 - Equipment Office
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white border-2 border-gray-800 p-6">
              <h3 className="font-bold text-gray-800 mb-4">RESERVE THIS ITEM</h3>

              {/* Date Pickers */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">BORROW DATE</div>
                  <div className="h-10 bg-white border-2 border-gray-800 flex items-center px-3">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Select date</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">RETURN DATE</div>
                  <div className="h-10 bg-white border-2 border-gray-800 flex items-center px-3">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Select date</span>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <div className="text-xs text-gray-600 mb-1">QUANTITY</div>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 bg-white border-2 border-gray-800 flex items-center justify-center hover:bg-gray-100">
                    <Minus className="w-4 h-4 text-gray-800" />
                  </button>
                  <div className="w-16 h-10 bg-white border-2 border-gray-800 flex items-center justify-center">
                    <span className="font-semibold text-gray-800">1</span>
                  </div>
                  <button className="w-10 h-10 bg-white border-2 border-gray-800 flex items-center justify-center hover:bg-gray-100">
                    <Plus className="w-4 h-4 text-gray-800" />
                  </button>
                  <span className="text-sm text-gray-600 ml-2">5 available</span>
                </div>
              </div>

              {/* Purpose */}
              <div className="mb-6">
                <div className="text-xs text-gray-600 mb-1">PURPOSE (OPTIONAL)</div>
                <div className="h-20 bg-white border-2 border-gray-800 p-3">
                  <span className="text-sm text-gray-400">Describe your intended use...</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Link to="/cart">
                <div className="h-12 bg-gray-800 border-2 border-gray-800 flex items-center justify-center hover:bg-gray-700">
                  <span className="text-white font-semibold">ADD TO CART</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white border-2 border-gray-800 p-6">
          <h3 className="font-bold text-gray-800 mb-4">BORROWING POLICY</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex gap-2">
              <span className="text-gray-600">•</span>
              <span>Maximum borrowing period: 7 days</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-600">•</span>
              <span>Late returns may result in suspension from future borrowing</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-600">•</span>
              <span>You are responsible for any damage or loss during your borrowing period</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-600">•</span>
              <span>Equipment must be returned to the same location during office hours (9AM - 5PM)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
