export const VW_API_INIT_VALUES: {
  baseUrl: string;
} = {
  baseUrl: "",
};

type VWAPIInitOptions = {
  baseUrl: string;
};

export const init = (params: VWAPIInitOptions) => {
  const { baseUrl } = params;
  VW_API_INIT_VALUES.baseUrl = baseUrl;
};
