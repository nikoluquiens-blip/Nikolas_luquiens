"use client";
import { motion } from "motion/react";

const players = [
  { name: "Luquiens N.", pos: "C", avail: [true, true, false, true, true] },
  { name: "Joueur 2", pos: "D", avail: [true, false, true, true, false] },
  { name: "Joueur 3", pos: "G", avail: [false, true, true, false, true] },
  { name: "Joueur 4", pos: "LW", avail: [true, true, true, true, true] },
  { name: "Joueur 5", pos: "RW", avail: [true, false, false, true, true] },
];
const days = ["Lun", "Mar", "Mer", "Jeu", "Ven"];

export default function BrowserMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10"
    >
      {/* Browser chrome */}
      <div className="bg-[#1c1c24] border-b border-white/10 px-4 py-3 flex items-center gap-3">
        {/* Traffic lights */}
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        {/* URL bar */}
        <div className="flex-1 bg-[#111118] border border-white/8 rounded-md px-3 py-1.5 flex items-center gap-2 min-w-0">
          <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-gray-400 text-xs truncate">hockey-planning.vercel.app/planning</span>
        </div>
        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-sm bg-white/5 border border-white/8" />
          ))}
        </div>
      </div>

      {/* App content */}
      <div className="bg-[#0d1117] flex" style={{ minHeight: 280 }}>
        {/* Sidebar */}
        <div className="w-12 border-r border-white/5 flex flex-col items-center gap-4 pt-4 flex-shrink-0">
          {[
            { icon: "🏒", active: false },
            { icon: "📅", active: true },
            { icon: "👥", active: false },
            { icon: "📊", active: false },
          ].map(({ icon, active }) => (
            <div
              key={icon}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm cursor-pointer transition-all ${
                active ? "bg-blue-500/20 ring-1 ring-blue-500/40" : "hover:bg-white/5"
              }`}
            >
              {icon}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-4 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white text-sm font-semibold">Planning Équipe</p>
              <p className="text-gray-600 text-xs">Semaine 24 · Juin 2026</p>
            </div>
            <div className="flex gap-2">
              <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-2.5 py-1 rounded-md">
                Cette semaine
              </div>
              <div className="bg-white/5 border border-white/8 text-gray-500 text-xs px-2.5 py-1 rounded-md">
                + Ajouter
              </div>
            </div>
          </div>

          {/* Grid header */}
          <div className="grid mb-2" style={{ gridTemplateColumns: "1fr 28px repeat(5, 1fr)" }}>
            <span className="text-gray-700 text-xs px-1">Joueur</span>
            <span className="text-gray-700 text-xs text-center">Pos</span>
            {days.map((d) => (
              <span key={d} className="text-gray-600 text-xs text-center font-medium">{d}</span>
            ))}
          </div>

          {/* Player rows */}
          {players.map((p, pi) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + pi * 0.07 }}
              className="grid items-center mb-1.5 rounded-lg hover:bg-white/[0.03] px-1 py-1 transition-colors cursor-pointer"
              style={{ gridTemplateColumns: "1fr 28px repeat(5, 1fr)" }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                  pi === 0 ? "bg-blue-500/30 text-blue-300" : "bg-white/8 text-gray-400"
                }`}>
                  {p.name[0]}
                </div>
                <span className={`text-xs truncate font-medium ${pi === 0 ? "text-blue-300" : "text-gray-300"}`}>
                  {p.name}
                </span>
              </div>
              <span className="text-gray-600 text-[10px] text-center">{p.pos}</span>
              {p.avail.map((av, di) => (
                <div key={di} className="flex justify-center">
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold transition-all ${
                    av
                      ? "bg-green-500/15 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-500/70 border border-red-500/15"
                  }`}>
                    {av ? "✓" : "✗"}
                  </div>
                </div>
              ))}
            </motion.div>
          ))}

          {/* Bottom summary */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-gray-500 text-xs">4 disponibles lundi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-gray-500 text-xs">Prochain match: vendredi</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
