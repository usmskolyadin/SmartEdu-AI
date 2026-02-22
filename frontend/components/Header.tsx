"use client";

type Props = {
  onToggleSidebar: () => void;
};

export default function Header({ onToggleSidebar }: Props) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="bg-white/10 hover:bg-white/20 px-3 cursor-pointer py-2 rounded-xl transition"
        >
          ☰
        </button>

        <div>
          <h1 className="text-xl font-semibold tracking-wide">
            EduAI Vision
          </h1>
          <p className="text-xs text-white/50">
            Real-time AI monitoring system
          </p>
        </div>
      </div>

      {/* CENTER STATUS */}
      <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Camera Active
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full" />
          WebSocket Connected
        </div>

        <div className="text-white/40">
          Session: #A12X
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium">spacy?</p>
          <p className="text-xs text-white/50">Admin</p>
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold">
          S
        </div>
      </div>
    </header>
  );
}