import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme, ThemeState } from "@/types/theme";
import { OG_UI_THEME, CORPORATE_CORAL_THEME } from "@/lib/themeEngine";

const BUILT_IN_THEMES: Theme[] = [OG_UI_THEME, CORPORATE_CORAL_THEME];
const BUILT_IN_IDS = new Set(BUILT_IN_THEMES.map((t) => t.id));

interface ThemeStore extends ThemeState {
  setActiveTheme: (id: string) => void;
  addTheme: (theme: Theme) => void;
  removeTheme: (id: string) => void;
  renameTheme: (id: string, name: string) => void;
  getActiveTheme: () => Theme;
  shuffleTheme: () => void;
}

const STORAGE_KEY = "ui-cloner-themes";

function mergeWithBuiltIns(savedThemes: Theme[]): Theme[] {
  const customThemes = savedThemes.filter((t) => !BUILT_IN_IDS.has(t.id));
  return [...BUILT_IN_THEMES, ...customThemes];
}

function isBuiltIn(id: string): boolean {
  return BUILT_IN_IDS.has(id);
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      themes: BUILT_IN_THEMES,
      activeThemeId: CORPORATE_CORAL_THEME.id,

      setActiveTheme: (id) => {
        set({ activeThemeId: id });
      },

      addTheme: (theme) => {
        set((state) => ({
          themes: [...state.themes.filter((t) => t.id !== theme.id), theme],
          activeThemeId: theme.id,
        }));
      },

      removeTheme: (id) => {
        if (isBuiltIn(id)) return;
        set((state) => {
          const filtered = state.themes.filter((t) => t.id !== id);
          return {
            themes: filtered,
            activeThemeId:
              state.activeThemeId === id
                ? OG_UI_THEME.id
                : state.activeThemeId,
          };
        });
      },

      renameTheme: (id, name) => {
        if (isBuiltIn(id)) return;
        set((state) => ({
          themes: state.themes.map((t) =>
            t.id === id ? { ...t, name } : t
          ),
        }));
      },

      getActiveTheme: () => {
        const state = get();
        return (
          state.themes.find((t) => t.id === state.activeThemeId) || OG_UI_THEME
        );
      },

      shuffleTheme: () => {
        const state = get();
        const customThemes = state.themes.filter((t) => !t.isBuiltIn);
        if (customThemes.length === 0) {
          // If no custom themes, shuffle between built-ins
          const builtIns = state.themes.filter((t) => t.isBuiltIn);
          if (builtIns.length <= 1) return;
          const others = builtIns.filter((t) => t.id !== state.activeThemeId);
          const next = others[Math.floor(Math.random() * others.length)];
          set({ activeThemeId: next.id });
          return;
        }
        const randomTheme =
          customThemes[Math.floor(Math.random() * customThemes.length)];
        set({ activeThemeId: randomTheme.id });
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        themes: state.themes,
        activeThemeId: state.activeThemeId,
      }),
      merge: (persistedState, currentState) => {
        const saved = persistedState as Partial<ThemeState>;
        const savedThemes = saved.themes || [];
        return {
          ...currentState,
          themes: mergeWithBuiltIns(savedThemes),
          activeThemeId: saved.activeThemeId || OG_UI_THEME.id,
        };
      },
    }
  )
);
