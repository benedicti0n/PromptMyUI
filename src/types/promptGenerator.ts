export type TargetTool =
  | "openCode"
  | "cursor"
  | "kimi"
  | "claudeCode"
  | "v0"
  | "bolt"
  | "lovable"
  | "generic";

export type OutputDepth =
  | "quickPrompt"
  | "detailedDesignSystem"
  | "fullImplementation";

export interface GeneratorOptions {
  targetTool: TargetTool;
  outputDepth: OutputDepth;
  extraInstruction: string;
}

export interface DesignTokens {
  colors: {
    background: string[];
    foreground: string[];
    primary: string[];
    accent: string[];
    muted: string[];
    border: string[];
  };
  typography: {
    fontDirection: string;
    headingStyle: string;
    bodyStyle: string;
    scale: string;
  };
  spacing: string;
  radius: string;
  shadows: string;
  effects: string;
}

export interface ComponentRules {
  buttons: string;
  cards: string;
  navigation: string;
  forms: string;
  badges: string;
  sections: string;
}

export interface PromptResult {
  styleSummary: string;
  designTokens: DesignTokens;
  componentRules: ComponentRules;
  layoutRules: string;
  responsiveRules: string;
  doNotUse: string[];
  fullPrompt: string;
  validationChecklist: string[];
}

export interface GeneratorState {
  imageBase64: string | null;
  mimeType: string | null;
  options: GeneratorOptions;
  result: PromptResult | null;
  isLoading: boolean;
  error: string | null;
  activeTab: string;
}
