import { Box, Container, Divider, FormControl, Grid } from '@mui/material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IllustrationLogin from 'src/assets/images/IllustrationLogin.svg';
import logo from 'src/assets/images/indexnine-logo.svg';
import axiosInstance from 'src/core/interceptors/axios-instance';
import { Card } from 'src/shared/components/index';
import { setSelectedTenantId, setUserDetails, UserType } from 'src/store/reducer/userReducer';
import styled from 'styled-components';
import LoginByUserNamePassword from './LoginByUserNamePassword';
import { useState } from 'react';
import {
  ToastMsgs
} from 'src/shared/components/toaster/Toast';
import PasswordWithLogin from './PasswordWithLogin';
import { getLoginMethodAPI, getLoginSSOAPI } from './api/api';
import { LIST_OF_TENANTS, USER_DASHBOARD, USER } from 'src/shared/constants/routes';
export type loginData = {
  loginType: string;
  email: string;
};

const Login = () => {
  // Constants
  const navigate = useNavigate();
  const { t } = useTranslation(['english']);
  const dispatch = useDispatch();

  //state variables
  const [loginType, setLoginType] = useState<string>('');
  const [isOnEmailScreen, setIsOnEmailScreen] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');

  //methods
  const MainContent = styled(Box)(
    () => `
      height: 100%;
      display: flex;
      flex: 1;
      overflow: auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `
  );
  const responseonSuccessGoogle = (response: any) => {
    if (response) {

    }
  };

  const responseonFailureGoogle = (response: any) => {
  };

  const handleTokenAndNavigation = (token: string, refreshToken: string) => {
    if (token) {
      localStorage.setItem('access_token', `Bearer ${token}`);
      localStorage.setItem('refresh_token', `Bearer ${refreshToken}`);
      const decodedToken = jwtDecode<UserType>(token);
      dispatch(setUserDetails(decodedToken));

      if (decodedToken.tenantRoles.length > 1) {
        navigate(LIST_OF_TENANTS, { state: { decodedToken } });
      } else {
        axiosInstance.defaults.headers['currentTenantId'] =
          decodedToken?.tenantRoles[0]?.tenantId;
        dispatch(setSelectedTenantId(decodedToken?.tenantRoles[0]?.tenantId));
        if (decodedToken.tenantRoles[0].roles.includes('ADMIN')) {
          navigate(USER);
        } else {
          navigate(USER_DASHBOARD);
        }
      }
    }
  };

  const handlePasswordLogin = async (value: { password: string }) => {

    try {
      const res = await axiosInstance.post('api/v1/auth/login', {
        email: email,
        password: value.password,
      });
      const token = res?.data?.accessToken?.token;
      const refreshToken = res?.data?.refreshToken?.token;
      handleTokenAndNavigation(token, refreshToken);
    } catch (error) {
      ToastMsgs.showErrorMessage(error.response?.data?.message, {
        position: 'top-right'
      });
    }
  };

  const handleLoginMethod = async (value: { email: string }) => {
    setEmail(value.email);
    try {
      const loginMethod = await getLoginMethodAPI(value.email);

      if (loginMethod === 'sso') {
        // Handle SSO login
        await getLoginSSOAPI(value.email);
      } else if (loginMethod === 'password') {
        setIsOnEmailScreen(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      ToastMsgs.showErrorMessage(error.response?.data?.message, {
        position: 'top-right'
      });
    }
  };

  // HTML
  return (
    <>
      <Helmet>
        <title> {t('login.title')}</title>
      </Helmet>
      <MainContent className="loginWrapper">
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6} className="flex-basic-center">
              <Box>
                <img
                  className="img-fluid illustrationLoginImage"
                  alt="IllustrationLogin"
                  src={IllustrationLogin}
                ></img>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card sx={{ px: 5, py: 4 }}>
                <Box>
                  <Box sx={{ mb: 4 }}>
                    <img
                      className="indexnine"
                      style={{ height: '34px' }}
                      src={logo}
                    />
                  </Box>
                  {isOnEmailScreen ? (
                    <>
                      <Box>
                        <Box
                          className="text-h4 welcomeText font-weight-semibold"
                          sx={{ mb: 4 }}
                        >
                          {t('login.welcomeText')}
                        </Box>
                      </Box>
                      <LoginByUserNamePassword getOtpOnEmail={handleLoginMethod} setIsOnEmailScreen={setIsOnEmailScreen}
                        loginType={loginType} />
                      <Divider sx={{ my: 5 }}>{t('login.orText')}</Divider>
                      <Box className="w-100">
                        <FormControl
                          className="w-100"
                          variant="outlined"
                          fullWidth
                        >
                          <Box
                            textAlign="center"
                            display={'flex'}
                            justifyContent={'center'}
                            className="w-100"
                          >
                            <GoogleOAuthProvider
                              clientId={'AUTH_CONFIG.GOOGLE_CLIENT_ID'}
                            >
                              <GoogleLogin
                                onSuccess={(response) => {
                                  responseonSuccessGoogle(response);
                                }}
                                onError={() => {
                                  responseonFailureGoogle(null);
                                }}
                                useOneTap={false}
                              />
                            </GoogleOAuthProvider>
                          </Box>
                        </FormControl>
                      </Box>
                    </>
                  ) : (
                    <>
                      <PasswordWithLogin loginWithPassword={handlePasswordLogin} />
                    </>
                  )}
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </MainContent>
    </>
  );
};

export default Login;
