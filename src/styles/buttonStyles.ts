// Shared button styling for the fortune flow so every CTA, confirm action,
// and toggle pill shares the same typography, borders, and hover/disabled behaviour.

export const FORTUNA_PRIMARY_BUTTON_CLASS =
  "inline-flex items-center justify-center border border-fortuna-gold bg-[rgba(201,162,39,0.06)] font-cinzel text-xs tracking-[3px] text-fortuna-gold-light transition-colors duration-150 hover:bg-[rgba(201,162,39,0.14)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[rgba(201,162,39,0.06)]";

export const FORTUNA_GHOST_BUTTON_CLASS =
  "font-cinzel text-[10px] uppercase tracking-[3px] text-fortuna-gold-faint transition-colors duration-150 hover:text-fortuna-gold-dim";

export const FORTUNA_PILL_BUTTON_CLASS =
  "border px-3 py-1.5 font-cinzel text-xs tracking-[1px] transition-colors duration-150";

export const FORTUNA_PILL_BUTTON_ACTIVE_CLASS = "border-fortuna-gold text-fortuna-gold-light";

export const FORTUNA_PILL_BUTTON_INACTIVE_CLASS =
  "border-[rgba(201,162,39,0.3)] text-fortuna-gold-dim hover:border-fortuna-gold-dim hover:text-fortuna-gold-soft";
