import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Ambient drifting glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl animate-[drift_14s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl animate-[drift_18s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <div className="max-w-3xl text-center">

          <p className="font-mono text-xs uppercase tracking-[0.4em] text-sky-400/90">
            Now Streaming — Welcome to Plavio
          </p>

          <h1 className="mt-5 text-4xl sm:text-6xl font-black leading-[1.05] tracking-tight">
            Discover your next
            <br className="hidden sm:block" /> favorite video.
          </h1>


          <Link
            to="/home"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-sky-700 px-10 py-5.5 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-400/50 hover:scale-105"
          >
            Play Now
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white transition-transform group-hover:translate-x-0.5">
              <path d="M8 5.14v13.72c0 .84.93 1.35 1.63.9l10.99-6.86a1.06 1.06 0 0 0 0-1.8L9.63 4.24C8.93 3.79 8 4.3 8 5.14Z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;