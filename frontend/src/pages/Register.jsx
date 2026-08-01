import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/user.api";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) return toast.error("Avatar is required");

    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    formData.append("avatar", avatar);
    if (coverImage) formData.append("coverImage", coverImage);

    setLoading(true);
    try {
      await registerUser(formData);
      toast.success("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-3 py-6 sm:px-6 sm:py-10">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl shadow-blue-900/5 sm:p-8 lg:p-10">
        <h1 className="mb-1 text-2xl font-black tracking-tighter text-slate-900 sm:text-3xl">Registration</h1>
        <p className="mb-6 text-sm font-medium tracking-tight text-slate-500 sm:mb-8">Join the next-gen video community</p>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text" name="username" placeholder="Username (@)"
              value={form.username} onChange={handleChange} required
              className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 border border-slate-200 font-medium"
            />
            <input
              type="text" name="fullname" placeholder="Full Name"
              value={form.fullname} onChange={handleChange} required
              className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 border border-slate-200 font-medium"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="email" name="email" placeholder="Email Address"
              value={form.email} onChange={handleChange} required
              className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 border border-slate-200 font-medium"
            />
            <input
              type="password" name="password" placeholder="Password"
              value={form.password} onChange={handleChange} required
              className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 border border-slate-200 font-medium"
            />
          </div>

          <div className="space-y-1.5 pt-1 sm:pt-2">
            <label className="text-[10px] font-bold text-slate-400 block px-1 uppercase tracking-widest">Avatar Image (Required)</label>
            <input
              type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full text-slate-500 text-xs cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all font-bold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 block px-1 uppercase tracking-widest">Cover Image (Optional)</label>
            <input
              type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])}
              className="w-full text-slate-500 text-xs cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all font-bold"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="mt-3 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-95 sm:mt-4 sm:py-4"
          >
            {loading ? "Creating Identity..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm font-bold text-slate-500 sm:mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Sign In Instead</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
