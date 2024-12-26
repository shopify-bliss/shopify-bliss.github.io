const baseUrl = "https://shopify-blissserver.vercel.app";

const urlEndpoint = {
  loginGoogle: `${baseUrl}/auth/google`,
  loginForm: `${baseUrl}/auth/login`,
  signupForm: `${baseUrl}/auth/registration`,
  verifyEmail: `${baseUrl}/auth/verify-email`,
  pagesAi: `${baseUrl}/api/type-templates`,
  pagesAiId: `${baseUrl}/api/type-templates-id`,
  elementsAi: `${baseUrl}/api/section-templates`,
  elementsAiId: `${baseUrl}/api/section-templates-id`,
  menus: `${baseUrl}/api/menu`,
  menusId: `${baseUrl}/api/menu-id`,
  submenus: `${baseUrl}/api/sub-menu`,
  submenusId: `${baseUrl}/api/sub-menu-id`,
  accessManagement: `${baseUrl}/api/access-management`,
};

export default urlEndpoint;
