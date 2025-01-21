import { LOGIN_METHOD_EP, LOGIN_SSO_EP } from './loginEndpoints';
import { apiGet } from 'src/shared/utils/api-request';

export const getLoginMethodAPI = async (email: string) => {
  try {
    const url = `${LOGIN_METHOD_EP}?email=${email}`;
    const response = await apiGet(url);
    return response.data.loginType;
  } catch (error) {
    console.error('Error fetching login method:', error);
    return null;
  }
};

export const getLoginSSOAPI = async (email: string) => {
  try {
    const url = `${import.meta.env.VITE_APP_SERVER_API_URL}${LOGIN_SSO_EP}?email=${email}`;
    const response = await window.open(url, '_self');
    return response;
  } catch (error) {
    console.error('Error fetching login method:', error);
    return null;
  }
};
