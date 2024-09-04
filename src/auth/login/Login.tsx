import {
  Box,
  CardContent,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid2 as Grid,
  Link
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/providers/AuthguardContext';
import {
  Button,
  CheckBox,
  TextField,
  Typography,
  Card,
  ToastMsgs
} from 'src/shared/components/index';
import Googlelogo from '../../assets/images/Googlelogo.png';
import Microsoftlogo from '../../assets/images/Microsoftlogo.png';
import * as ROUTES from '../../shared/constants/routes';
import { useTranslation } from 'react-i18next';

const Login = () => {
  // Constants
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation('english');

  // State Values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');

  // Methods
  const submitLoginDetails = () => {
    localStorage.setItem('accessToken', 'tokendasdasda#aasdas131233');
    localStorage.setItem('userRoles', JSON.stringify([]));
    login('tokendasdasda#aasdas131233');
    if (email && password) {
      navigate(ROUTES.DASHBOARD);
      localStorage.setItem('logged', JSON.stringify(true));
    } else {
      ToastMsgs.showWarningMessage('not valid', {
        theme: 'dark',
        position: 'bottom-right'
      });
    }
    setEmail('');
    setPassword('');
  };

  const goToSignUp = () => {
    navigate('signup');
  };

  // HTML
  return (
    <Container className="loginWrapper h-100 flex-basic-center">
      <Container className="containerCenter" maxWidth="md">
        <Card>
          <Grid container spacing={2} className="">
            <Grid
              className="flex-basic-center loginBox"
              size={{
                xs:12,
                sm:6,
                md:6,
                lg:6
              }}
             
            >
              <CardContent sx={{ p: 5 }}>
                <Box sx={{ mb: 3 }} className="flex-basic-center">
                  <img src="https://indexnine.com/wp-content/uploads/2019/06/indexnine.com_.gif" />
                </Box>
                <CssBaseline />
                <Typography
                  className="loginTextStyle"
                  variant="h5"
                  align="center"
                >
                  {t('signIn')}
                </Typography>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={t('emailAddress')}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={t('password')}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<CheckBox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  btnText={t('signUp')}
                  onClick={submitLoginDetails}
                ></Button>

                <Box className="flex-basic-space-between">
                  <Link sx={{ pr: 1 }} href="#" variant="body2">
                    {t('forgotPassword')}?
                  </Link>

                  <Link onClick={goToSignUp} href="#" variant="body2">
                    {t('noAccountLabel')}
                  </Link>
                </Box>
              </CardContent>
            </Grid>
            <Grid
              className="loginWithGoogle flex-basic-center"
              size={{
                xs:12,
                sm:6,
                md:6,
                lg:6
              }}
            >
              <Box sx={{ p: 10 }} className="flex-column-center w-100">
                <Box className="w-100">
                  <Button
                    variant="outlined"
                    sx={{ px: 2 }}
                    className="w-100"
                    startIcon={
                      <Box className="flex-basic-center">
                        <img src={Googlelogo} />
                        <Box sx={{ pl: 1 }}>{t('google')}</Box>
                      </Box>
                    }
                  ></Button>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Typography variant="h5" align="center">
                    Or
                  </Typography>
                </Box>
                <Box className="w-100">
                  <Button
                    className="w-100"
                    variant="outlined"
                    startIcon={
                      <Box className="flex-basic-center">
                        <img src={Microsoftlogo} />
                        <Box sx={{ pl: 1 }}>{t('microsoft')}</Box>
                      </Box>
                    }
                  ></Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Container>
  );
};

export default Login;
