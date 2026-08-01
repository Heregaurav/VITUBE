import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/slices/authSlice";
import { toggleSidebar, toggleDarkMode } from "../../app/slices/uiSlice";
import { Search, Menu, LogOut, Upload, Settings, Moon, Sun } from "lucide-react";
import toast from "react-hot-toast";
import { Play } from "lucide-react";


function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.ui.darkMode);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("Logged out!");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 gap-4 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button onClick={() => dispatch(toggleSidebar())} className="text-slate-600 hover:text-blue-600 transition-colors">
          <Menu size={22} />
        </button>
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500">
                <Play className="h-3 w-3 fill-white text-white" />
              </div>

              <span>
                <span className="text-blue-600">Pla</span>
                <span className="text-slate-900">vio</span>
              </span>
            </Link>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl">
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full overflow-hidden transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos..."
            className="flex-1 bg-transparent text-slate-900 px-4 py-2 text-sm outline-none"
          />
          <button type="submit" className="px-4 py-2 text-slate-400 hover:text-blue-600 transition-colors">
            <Search size={18} />
          </button>
        </div>
      </form>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="relative p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-all"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {isAuthenticated ? (
          <>
            <Link
              to="/upload"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-2 rounded-full transition-all shadow-md shadow-blue-200 active:scale-95 uppercase tracking-wider"
            >
              <Upload size={16} /> Upload
            </Link>
            <Link to="/settings" className="text-slate-400 hover:text-blue-600 transition-colors p-1.5 hover:bg-slate-50 rounded-full">
              <Settings size={18} />
            </Link>
            <Link to={`/channel/${user?.username}`}>
              <img src={user?.avatar} className="w-8 h-8 rounded-full object-cover border-2 border-slate-200 hover:border-blue-600 transition-colors" />
            </Link>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-600 transition-colors p-1.5">
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all shadow-md shadow-blue-200 active:scale-95">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
