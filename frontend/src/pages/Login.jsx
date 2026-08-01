import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../app/slices/authSlice";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(form));
    if (login.fulfilled.match(result)) {
      toast.success("Welcome back!");
      navigate("/home");
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mt-0 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl shadow-blue-900/5 sm:p-10">
        <h1 className="mb-1 text-3xl font-black tracking-tighter text-slate-900">Sign In</h1>
        <p className="mb-8 text-sm font-medium text-slate-500 sm:mb-10">Continue your journey with Plavio</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
             <label className="text-xs font-bold text-slate-400 px-1 uppercase tracking-widest">Email Address</label>
             <input
               type="email" name="email" placeholder="name@example.com"
               value={form.email} onChange={handleChange} required
               className="w-full bg-slate-50 text-slate-900 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-100 border border-slate-200 focus:border-blue-400 transition-all font-medium"
             />
          </div>
          <div className="space-y-1">
             <label className="text-xs font-bold text-slate-400 px-1 uppercase tracking-widest">Password</label>
             <input
               type="password" name="password" placeholder="••••••••"
               value={form.password} onChange={handleChange} required
               className="w-full bg-slate-50 text-slate-900 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-100 border border-slate-200 focus:border-blue-400 transition-all font-medium"
             />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 mt-4"
          >
            {loading ? "Verifying..." : "Login Securely"}
          </button>
        </form>
        <p className="text-slate-500 text-sm mt-8 text-center font-semibold">
          New here?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
