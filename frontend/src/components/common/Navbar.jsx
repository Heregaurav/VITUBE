import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/slices/authSlice";
import { toggleSidebar, toggleDarkMode } from "../../app/slices/uiSlice";
import { Search, Menu, LogOut, Upload, Settings, Moon, Sun, UserRound, ChevronDown, Play } from "lucide-react";
import toast from "react-hot-toast";

function Avatar({ user, size = "h-8 w-8" }) {
  const [imgError, setImgError] = useState(false);
  const initial = (user?.fullname || user?.username || "?").charAt(0).toUpperCase();

  if (!user?.avatar || imgError) {
    return (
      <div
        className={`${size} flex items-center justify-center rounded-full bg-blue-600 font-bold text-white`}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={user.avatar}
      onError={() => setImgError(true)}
      className={`${size} rounded-full object-cover`}
      alt={user?.username || "Profile"}
    />
  );
}

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.ui.darkMode);
  const [query, setQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowMobileSearch(false);
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("Logged out!");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white px-1 py-2.5 shadow-sm sm:px-4 sm:py-3">
      <div className="flex items-center justify-between gap-1 sm:gap-3">
        {/* Left */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="text-slate-600 transition-colors hover:text-blue-600"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-[18px] w-[15px] sm:h-5 sm:w-5" />
          </button>
          <Link to="/home" className="flex items-center gap-1 text-base font-bold sm:gap-2 sm:text-2xl">
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-blue-500 sm:h-6 sm:w-6">
              <Play className="h-2.5 w-2.5 fill-white text-white sm:h-3 sm:w-3" />
            </div>
            <span className="text-xs sm:text-base">
              <span className="text-blue-600">Pla</span>
              <span className="text-slate-900">vio</span>
            </span>
          </Link>
        </div>

        {/* Center search - desktop/tablet only */}
        <form onSubmit={handleSearch} className="hidden w-full max-w-sm sm:flex">
          <div className="flex w-full items-center overflow-hidden rounded-full border border-slate-200 bg-slate-50 transition-all focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search videos..."
              className="flex-1 bg-transparent px-4 py-2 text-sm text-slate-900 outline-none"
            />

            <button type="submit" className="px-3 py-2 text-slate-400 transition-colors hover:text-blue-600">
              <Search size={16} />
            </button>
          </div>
        </form>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <form onSubmit={handleSearch} className="flex flex-1 items-center sm:hidden">
            <div className="flex w-full items-center overflow-hidden rounded-full border border-slate-200 bg-slate-50 transition-all focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="min-w-0 flex-1 bg-transparent px-2.5 py-1 text-xs text-slate-900 outline-none"
              />
              <button type="submit" className="px-1.5 py-1 text-slate-400 transition-colors hover:text-blue-600">
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          </form>

          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="hidden rounded-full p-1 text-slate-500 transition-all hover:bg-slate-100 hover:text-blue-600 sm:block sm:p-2"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/upload"
                className="hidden sm:flex items-center gap-1 rounded-full bg-blue-600 px-2 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95 sm:gap-2 sm:px-4 sm:py-2 sm:text-[11px]"
                aria-label="Upload"
              >
                <Upload size={14} /> <span className="hidden sm:inline">Upload</span>
              </Link>

              {/* Single profile trigger, visible at every breakpoint */}
              <div className="relative shrink-0" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className="flex items-center gap-1 rounded-full border border-slate-200 p-0.5 transition-colors hover:border-blue-600 sm:border-2 sm:pr-2"
                  aria-label="Open profile menu"
                >
                  <Avatar user={user} size="h-7 w-7 sm:h-8 sm:w-8" />
                  <ChevronDown
                    size={14}
                    className={`hidden text-slate-400 transition-transform sm:block ${showProfileMenu ? "rotate-180" : ""}`}
                  />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/70">
                    <div className="flex items-center gap-3 border-b border-slate-100 px-3 py-3">
                      <Avatar user={user} size="h-10 w-10" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-slate-900">
                          {user?.fullname || user?.username}
                        </p>
                        <p className="truncate text-[11px] font-semibold text-slate-500">@{user?.username}</p>
                      </div>
                    </div>

                    <div className="p-2">
                      <button
                        onClick={() => dispatch(toggleDarkMode())}
                        className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600 sm:hidden"
                      >
                        {darkMode ? <Sun size={15} /> : <Moon size={15} />}
                        {darkMode ? "Light Mode" : "Dark Mode"}
                      </button>
                      <Link
                        to="/settings"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600"
                      >
                        <Settings size={15} />
                        Edit Profile
                      </Link>
                      <Link
                        to={`/channel/${user?.username}`}
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600"
                      >
                        <UserRound size={15} />
                        My Channel
                      </Link>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          handleLogout();
                        }}
                        className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-red-600"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="shrink-0 whitespace-nowrap rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95 sm:px-5 sm:py-2"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

    </nav>
  );
}

export default Navbar;