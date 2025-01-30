const baseUrl = "https://shopify-blissserver.vercel.app";

const urlEndpoint = {
  loginGoogle: `${baseUrl}/auth/google`,
  loginForm: `${baseUrl}/auth/login`,
  signupForm: `${baseUrl}/auth/registration`,
  verifyEmail: `${baseUrl}/auth/verify-email`,
  brandsAi: `${baseUrl}/api/brand`,
  pagesAi: `${baseUrl}/api/type-templates`,
  pagesAiId: `${baseUrl}/api/type-templates-id`,
  elementsAi: `${baseUrl}/api/section-templates`,
  elementsAiId: `${baseUrl}/api/section-templates-id`,
  colorsAi: `${baseUrl}/api/color-design`,
  colorsAiId: `${baseUrl}/api/color-design-id`,
  colors: `${baseUrl}/api/color`,
  colorId: `${baseUrl}/api/color-id`,
  fontsAi: `${baseUrl}/api/font-design`,
  fontsAiId: `${baseUrl}/api/font-design-id`,
  fonts: `${baseUrl}/api/fonts`,
  font: `${baseUrl}/api/font`,
  aiBuilder: `${baseUrl}/api/ai-builder`,
  aiBuilderUser: `${baseUrl}/api/ai-builder-id`, // by user_id
  aiBuilderId: `${baseUrl}/api/ai-builder-id-builder`, // by ai_builder_id
  aiBuilderSections: `${baseUrl}/api/ai-builder-section`,
  aiBuilderSectionsId: `${baseUrl}/api/ai-builder-section-id`,
  aiBuilderSupports: `${baseUrl}/api/ai-builder-support`,
  aiBuilderSupportsId: `${baseUrl}/api/ai-builder-support-id`,
  menus: `${baseUrl}/api/menu`,
  menusId: `${baseUrl}/api/menu-id`,
  submenus: `${baseUrl}/api/sub-menu`,
  submenusId: `${baseUrl}/api/sub-menu-id`,
  accessManagement: `${baseUrl}/api/access-management`,
  allusers: `${baseUrl}/api/all-user`,
  addAdmin: `${baseUrl}/api/add-admin`,
  userId: `${baseUrl}/api/user`,
  role: `${baseUrl}/auth/role`,
  roleId: `${baseUrl}/auth/role-id`,
  updateUserRole: `${baseUrl}/api/role-update`,
  sendOtpPassword: `${baseUrl}/api/send-otp`,
  verifyOtpPassword: `${baseUrl}/api/otp-password`,
  updatePassword: `${baseUrl}/api/update-password`,
};

export default urlEndpoint;
