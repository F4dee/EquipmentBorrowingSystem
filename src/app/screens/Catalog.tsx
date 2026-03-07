import { Link } from "react-router";
import { Search, ShoppingCart, User } from "lucide-react";

export function Catalog() {
  const categories = ["Laptops", "Cameras", "Projectors", "Audio", "Cables", "Other"];
  const availability = ["Available", "On Loan", "Maintenance"];
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-300 border-2 border-gray-800"></div>
              <span className="font-bold text-gray-800 hidden sm:block">Equipment System</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <div className="h-10 bg-white border-2 border-gray-800 flex items-center px-3">
                  <Search className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-400 text-sm">Search equipment...</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link to="/cart">
                <div className="w-10 h-10 bg-white border-2 border-gray-800 flex items-center justify-center hover:bg-gray-100">
                  <ShoppingCart className="w-5 h-5 text-gray-800" />
                </div>
              </Link>
              <Link to="/profile">
                <div className="w-10 h-10 bg-white border-2 border-gray-800 flex items-center justify-center hover:bg-gray-100">
                  <User className="w-5 h-5 text-gray-800" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0 hidden md:block">
            <div className="bg-white border-2 border-gray-800 p-4 sticky top-6">
              <h3 className="font-bold text-gray-800 mb-4">FILTERS</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <div className="text-xs text-gray-600 mb-2 font-semibold">CATEGORY</div>
                <div className="space-y-2">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white border-2 border-gray-800"></div>
                      <span className="text-sm text-gray-700">{cat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <div className="text-xs text-gray-600 mb-2 font-semibold">AVAILABILITY</div>
                <div className="space-y-2">
                  {availability.map((status, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white border-2 border-gray-800"></div>
                      <span className="text-sm text-gray-700">{status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <div className="h-10 bg-white border-2 border-gray-800 flex items-center justify-center hover:bg-gray-100">
                <span className="font-semibold text-gray-800 text-sm">RESET FILTERS</span>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Equipment Catalog</h2>
                <p className="text-sm text-gray-600 mt-1">48 items available</p>
              </div>
              <div className="w-48 h-10 bg-white border-2 border-gray-800 flex items-center px-3">
                <span className="text-sm text-gray-600">Sort by: Popular</span>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, idx) => (
                <Link key={idx} to={`/item/${idx + 1}`}>
                  <div className="bg-white border-2 border-gray-800 hover:shadow-lg transition-shadow">
                    {/* Product Image */}
                    <div className="aspect-square bg-gray-200 border-b-2 border-gray-800 flex items-center justify-center">
                      <div className="w-24 h-24 bg-gray-300 border-2 border-gray-600"></div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="text-xs text-gray-600 mb-1">LAPTOP</div>
                      <h3 className="font-bold text-gray-800 mb-2">MacBook Pro 16"</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="px-2 py-1 bg-gray-200 border border-gray-600 text-xs">
                          AVAILABLE
                        </div>
                        <span className="text-xs text-gray-600">ID: EQ-{String(idx + 1).padStart(3, '0')}</span>
                      </div>
                      <div className="h-8 bg-gray-800 border-2 border-gray-800 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">VIEW DETAILS</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
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
                <span className="text-gray-600">&gt;</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
