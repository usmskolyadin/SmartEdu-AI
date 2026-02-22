"use client";

type Props = {
  collapsed: boolean;
};

export default function Sidebar({ collapsed }: Props) {
  return (
    <aside
      className={`transition-all duration-300 border-r border-white/10 backdrop-blur-xl bg-white/5 ${
        collapsed ? "w-20" : "w-64"
      } p-4`}
    >
      <div className="flex flex-col gap-3 mt-4">
        {[
          { name: "Camera", icon: "🎥" },
          { name: "Recognition", icon: "🧠" },
          { name: "Analytics", icon: "📊" },
          { name: "Settings", icon: "⚙️" },
        ].map((item) => (
          <button
            key={item.name}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition text-left"
          >
            <span className="text-lg">{item.icon}</span>

            {!collapsed && (
              <span className="text-sm font-medium text-white/80">
                {item.name}
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}