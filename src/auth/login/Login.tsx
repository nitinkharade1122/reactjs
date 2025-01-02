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
import { setUserDetails, UserType } from 'src/store/reducer/userReducer';
import styled from 'styled-components';
import { TENANT, USER, USER_DASHBOARD } from '../../shared/constants/routes';
import LoginByUserNamePassword from './LoginByUserNamePassword';

const Login = () => {
  // Constants
  const navigate = useNavigate();
  const { t } = useTranslation(['english']);
  const dispatch = useDispatch();

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

  const getOtpOnEmail = async (value) => {
    const res = await axiosInstance.post('api/v1/auth/login', {
      email: value.email,
      password: value.password,
    });
    const token = res?.data?.accessToken?.token;
    localStorage.setItem('access_token', `Bearer ${token}`);

    if (token) {
      const decodedToken = jwtDecode<UserType>(token);
      dispatch(setUserDetails(decodedToken));
      const isSuperAdmin = decodedToken.tenantRoles.find((role) =>
        role.roles.includes('SUPER_ADMIN')
      );
      const isAdmin = decodedToken.tenantRoles.find((role) =>
        role.roles.includes('ADMIN')
      );
      // Navigate based on the role
      if (isSuperAdmin) {
        axiosInstance.defaults.headers['currentTenantId'] =
          isSuperAdmin?.tenantId;
        navigate(TENANT);
      } else if (isAdmin) {
        axiosInstance.defaults.headers['currentTenantId'] = isAdmin?.tenantId;
        navigate(USER);
      } else {
        axiosInstance.defaults.headers['currentTenantId'] =
          decodedToken?.tenantRoles[0]?.tenantId;
        navigate(USER_DASHBOARD);
      }
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
                  <>
                    <Box>
                      <Box
                        className="text-h4 welcomeText font-weight-semibold"
                        sx={{ mb: 4 }}
                      >
                        {t('login.welcomeText')}
                      </Box>
                    </Box>
                    <LoginByUserNamePassword getOtpOnEmail={getOtpOnEmail} />
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
                              onSuccess={(resp) => {
                                console.log(resp);
                              }}
                              onError={() => {
                                console.log('failed');
                              }}
                              useOneTap={false}
                            />
                          </GoogleOAuthProvider>
                        </Box>
                      </FormControl>
                    </Box>
                  </>
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
