export const colors = {
  // Primary colors
  primary: {
    main: '#007AFF',
    light: '#4DA3FF',
    dark: '#0055B3',
  },

  // Background colors
  background: {
    main: '#FFFFFF',
    secondary: '#F9F9F9',
    card: '#FFFFFF',
    modal: 'rgba(0, 0, 0, 0.5)',
    screen: '#F0F4F8',
    selected: '#E8F0FF',
    disabled: '#F5F5F5',
  },

  // Text colors
  text: {
    primary: '#000000',
    secondary: '#666666',
    light: '#999999',
    white: '#FFFFFF',
    disabled: '#CCCCCC',
  },

  // Risk profile colors
  riskProfile: {
    low: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      gradient: ['#4CAF50', '#8BC34A'],
    },
    medium: {
      main: '#FFC107',
      light: '#FFD54F',
      dark: '#FFA000',
      gradient: ['#FFC107', '#FFECB3'],
    },
    high: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
      gradient: ['#F44336', '#FFCDD2'],
    },
  },

  // Border colors
  border: {
    light: '#E0E0E0',
    medium: '#CCCCCC',
    dark: '#999999',
  },

  // Status colors
  status: {
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
  },

  // Button colors
  button: {
    primary: {
      background: '#007AFF',
      text: '#FFFFFF',
      gradient: ['#4c669f', '#3b5998', '#192f6a'],
    },
    secondary: {
      background: '#F5F5F5',
      text: '#000000',
    },
    disabled: {
      background: '#E0E0E0',
      text: '#999999',
    },
  },

  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },

  // Progress bar colors
  progress: {
    background: '#E0E0E0',
    fill: '#007AFF',
  },

  // Gradient colors
  gradient: {
    primary: ['#007AFF', '#00B4DB'],
    success: ['#4CAF50', '#45B649'],
    warning: ['#FFC107', '#FFB300'],
    error: ['#F44336', '#E53935'],
    button: ['#4c669f', '#3b5998', '#192f6a'],
  },
} as const;

// Type for the colors object
export type AppColors = typeof colors;

// Helper function to get risk profile color
export const getRiskProfileColor = (riskLevel: 'Low' | 'Medium' | 'High') => {
  const level = riskLevel.toLowerCase() as keyof typeof colors.riskProfile;
  return colors.riskProfile[level];
};

// Helper function to get gradient colors for risk profile
export const getRiskProfileGradient = (riskLevel: 'Low' | 'Medium' | 'High') => {
  const level = riskLevel.toLowerCase() as keyof typeof colors.riskProfile;
  return colors.riskProfile[level].gradient;
};

// Helper function to get button gradient colors
export const getButtonGradient = () => colors.button.primary.gradient; 