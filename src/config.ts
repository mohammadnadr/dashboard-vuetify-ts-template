export type ConfigProps = {
  Sidebar_drawer: boolean;
  Customizer_drawer: boolean;
  mini_sidebar: boolean;
  setHorizontalLayout: boolean;
  actTheme: string;
  fontTheme: string;
  inputBg: boolean;
  boxed: boolean;
  locale: string;
  isRtl: boolean;
};

const config: ConfigProps = {
  Sidebar_drawer: true,
  Customizer_drawer: false,
  mini_sidebar: false,
  setHorizontalLayout: false, // Horizontal layout
  actTheme: localStorage.getItem('actTheme') || 'dark',
  fontTheme:  localStorage.getItem('fontTheme') || 'Yekan sans',
  inputBg: false,
  boxed: false,
  locale: localStorage.getItem('locale') || 'fa',
  isRtl: !!(localStorage.getItem('locale') && localStorage.getItem('locale') !== 'en')
};

export default config;
