import { create } from "zustand";
import {
  GeneratorOptions,
  GeneratorState,
  PromptResult,
} from "@/types/promptGenerator";

interface GeneratorStore extends GeneratorState {
  setImage: (imageBase64: string | null, mimeType: string | null) => void;
  setOptions: (options: Partial<GeneratorOptions>) => void;
  setResult: (result: PromptResult | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setActiveTab: (tab: string) => void;
  reset: () => void;
}

const defaultOptions: GeneratorOptions = {
  targetTool: "generic",
  outputDepth: "detailedDesignSystem",
  extraInstruction: "",
};

const initialState: GeneratorState = {
  imageBase64: null,
  mimeType: null,
  options: defaultOptions,
  result: null,
  isLoading: false,
  error: null,
  activeTab: "fullPrompt",
};

export const useGeneratorStore = create<GeneratorStore>((set) => ({
  ...initialState,
  setImage: (imageBase64, mimeType) =>
    set({ imageBase64, mimeType, error: null }),
  setOptions: (options) =>
    set((state) => ({
      options: { ...state.options, ...options },
    })),
  setResult: (result) => set({ result, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  setActiveTab: (activeTab) => set({ activeTab }),
  reset: () => set(initialState),
}));
