"use client";

import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";
import {
  IconSunOutline24,
  IconMoonOutline24,
  IconMonitorOutline24,
} from "nucleo-core-outline-24";

const modes = [
  { value: "light" as const, icon: IconSunOutline24, label: "Light" },
  { value: "dark" as const, icon: IconMoonOutline24, label: "Dark" },
  { value: "system" as const, icon: IconMonitorOutline24, label: "System" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-0.5 rounded-full bg-brand-bg-card/80 backdrop-blur-md p-1 shadow-[0_0_0_1px_var(--brand-border),0_2px_8px_rgba(0,0,0,0.1)]">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => setTheme(mode.value)}
          className="relative rounded-full p-2.5 text-brand-muted hover:text-brand-text"
          style={{ transitionProperty: "color", transitionDuration: "150ms" }}
          title={mode.label}
        >
          {theme === mode.value && (
            <motion.div
              layoutId="theme-indicator"
              className="absolute inset-0 rounded-full bg-brand-bg-elevated shadow-[0_0_0_1px_var(--brand-border)]"
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            />
          )}
          <mode.icon size={16} className="relative z-10" />
        </button>
      ))}
    </div>
  );
}
