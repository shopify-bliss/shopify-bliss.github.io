const baseUrl = "https://shopify-blissserver.vercel.app";

const urlEndpoint = {
  pagesAi: `${baseUrl}/api/type-templates`,
  elementsAi: `${baseUrl}/api/section-templates`,
  loginGoogle: `${baseUrl}/auth/google`,
  loginForm: `${baseUrl}/auth/login`,
  signupForm: `${baseUrl}/auth/registration`,
};

export default urlEndpoint;
