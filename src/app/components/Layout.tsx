import { Link, useLocation } from "react-router";
import { 
  Home,
  UserPlus,
  Package,
  ShoppingCart,
  FileText,
  AlertCircle,
  Shield,
  User,
  Settings as SettingsIcon,
  ChevronRight,
  ChevronDown,
  Menu,
  Bell,
  Clock
} from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [adminExpanded, setAdminExpanded] = useState(true);

  const isActive = (path: string) => location.pathname === path;
  const isAdminPath = location.pathname.startsWith('/admin');

  const menuItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/register', icon: UserPlus, label: 'Register' },
    { path: '/catalog', icon: Package, label: 'Catalog' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart' },
    { path: '/requests', icon: FileText, label: 'Requests' },
    { path: '/report', icon: AlertCircle, label: 'Report' },
  ];

  const adminItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/inventory', label: 'Inventory' },
  ];

  const bottomItems = [
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: SettingsIcon, label: 'Settings' },
  ];

  const recentPages = [
    { path: '/item/4', label: 'item/4' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div>
                <h1 className="font-bold text-gray-900 text-sm">EQUIPMENT</h1>
                <p className="text-xs text-gray-500">BORROWING SYSTEM</p>
              </div>
            )}
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            ))}

            {/* Admin Section */}
            <div className="pt-2">
              <button
                onClick={() => setAdminExpanded(!adminExpanded)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isAdminPath && !collapsed
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Shield className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="text-sm font-medium flex-1 text-left">Admin</span>
                    {adminExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </>
                )}
              </button>

              {!collapsed && adminExpanded && (
                <div className="ml-8 mt-1 space-y-1">
                  {adminItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Items */}
            <div className="pt-2 border-t border-gray-200 mt-2">
              {bottomItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              ))}
            </div>

            {/* Recent Pages */}
            {!collapsed && recentPages.length > 0 && (
              <div className="pt-4">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Recent Pages:
                </div>
                {recentPages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <Clock className="w-4 h-4" />
                    <span>{page.label}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Add Pages */}
            {!collapsed && (
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg mt-2">
                <span className="text-lg">+</span>
                <span>Add Pages</span>
              </button>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
