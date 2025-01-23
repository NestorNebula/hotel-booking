import type { APIResponse, Method, RequestOptions } from '#types/fetch';

const getURL = () => {
  return import.meta.env.VITE_API_URL;
};

const getFetchOptions: (body: object, method: Method) => RequestOptions = (
  body,
  method
) => {
  return {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    method,
    mode: 'cors',
  };
};

const fetchAPI: ({
  path,
  body,
  method,
}: {
  path: string;
  body?: object;
  method: Method;
}) => Promise<APIResponse<any>> = async ({ path, body, method }) => {
  try {
    const response = await fetch(
      `${getURL()}${path}`,
      getFetchOptions(body ?? {}, method)
    );
    const result = await response.json();
    return {
      result,
      error: response.status >= 400,
    };
  } catch (e) {
    return {
      result: {
        error: e,
      },
      error: true,
    };
  }
};

export default fetchAPI;
