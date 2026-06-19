export interface Theme {
  id: string;
  name: string;
  createdAt: number;
  isBuiltIn?: boolean;
  designTokens: {
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
  };
  layoutRules: string;
  responsiveRules: string;
  componentRules: {
    buttons: string;
    cards: string;
    navigation: string;
    forms: string;
    badges: string;
    sections: string;
  };
}

export interface ThemeState {
  themes: Theme[];
  activeThemeId: string;
}
