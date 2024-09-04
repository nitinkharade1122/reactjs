import {
  Box,
  CardContent,
  Container,
  CssBaseline,
  Grid2 as Grid,
  Link
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Card,
  PasswordStrengthMeter
} from 'src/shared/components/index';
import Googlelogo from '../../assets/images/Googlelogo.png';
import Microsoftlogo from '../../assets/images/Microsoftlogo.png';

const SignUp = () => {
  //const
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const navigate = useNavigate();

  //methods
  const inputChange = (e: any, isError: boolean) => {
    setPassword(e?.target?.value);
    setIsPasswordError(isError);
  };
  const goToSignIn = () => {
    navigate('/');
  };

  return (
    <Container className="loginWrapper h-100 flex-basic-center">
      <Container className="containerCenter" maxWidth="md">
        <Card>
          <Grid container spacing={2} className="">
            <Grid
              className="flex-basic-center loginBox"
              size={{
                xs: 12,
                sm: 6,
                md: 6,
                lg: 6
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
                  Sign Up
                </Typography>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Box>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      inputChange(event, false);
                    }}
                  />
                  <PasswordStrengthMeter
                    password={password}
                    isError={isPasswordError}
                  />
                </Box>
                <Box>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    id="confirmpassword"
                    autoComplete="current-password"
                    value={''}
                  />
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  btnText="Sign Up"
                ></Button>
                <Link onClick={goToSignIn} variant="body2">
                  {'Already have account? Sign In'}
                </Link>
              </CardContent>
            </Grid>
            <Grid
              className="loginWithGoogle flex-basic-center"
              size={{
                xs: 12,
                sm: 6,
                md: 6,
                lg: 6
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
                        <Box sx={{ pl: 1 }}> Google</Box>
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
                        <Box sx={{ pl: 1 }}>Microsoft</Box>
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

export default SignUp;
