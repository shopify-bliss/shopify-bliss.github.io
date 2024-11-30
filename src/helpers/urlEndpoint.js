const baseUrl = "https://shopify-blissserver.vercel.app";

const urlEndpoint = {
  pagesAi: `${baseUrl}/api/type-templates`,
  elementsAi: `${baseUrl}/api/section-templates`,
  loginGoogle: `${baseUrl}/auth/google`,
  loginForm: `${baseUrl}/auth/login`,
};

export default urlEndpoint;
