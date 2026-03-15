const appConfig = {
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT ?? "",
  mockEnabled: import.meta.env.VITE_MOCK_ENABLED === "true",
};

export default appConfig;
