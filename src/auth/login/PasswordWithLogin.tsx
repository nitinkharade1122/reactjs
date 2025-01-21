import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/shared/components/button/Button';
import { useLocation } from 'react-router-dom';
import { FormField } from 'src/shared/components/form-field/FormField';
import { FormikProvider, useFormik } from 'formik';
import { FormFieldType } from 'src/shared/components/form-field/service/formFieldInterface';

interface OTPWithLoginProps {
  loginWithPassword?: (e) => void;
}

const PasswordWithLogin = ({ loginWithPassword }: OTPWithLoginProps) => {
  //const
  const { t } = useTranslation(['english']);
  const locationState = useLocation(); // Get location
  const { password: receivedPassword } = locationState.state || {};


  const initialValue = {
    password: "",
    role: "",
  };

  //redux
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const formik = useFormik({
    initialValues: initialValue,
    validateOnMount: true,
    onSubmit: (value) => {
      loginWithPassword(value);
    },
  });

  const { isValid, handleSubmit, setFieldValue } = formik;

  //Effects
  useEffect(() => {
    if (receivedPassword) {
      setFieldValue("password", receivedPassword); // Set the password in the form field
    }
  }, [receivedPassword]);


  useEffect(() => {
    if (isButtonDisabled) {
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 14000);
    }
  }, [isButtonDisabled]);

  const onSubmit = async (value) => {
    handleSubmit();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const loginFormFields: FormFieldType[] = [

    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
      handleKeyDown: handleKeyDown,
      placeholder: "Enter password",
      validations: {
        required: true,
      },
      errorMessages: {
        requiredErrMsg: "Please enter valid password",
        emailErrMsg: "Please enter valid password",
      },
    },
  ];

  return (
    <Box className="loginWithOtp">
      <Box className="text-h4 welcomeText font-weight-semibold" sx={{ mb: 2 }}>
        {t('login.loginWithPassword')}
      </Box>
      <FormikProvider value={formik}>
        {loginFormFields?.map((field, index) => (
          <Grid key={index} container direction="row" mt={3}>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              xl={12}
              className={index === 0 ? "mb-16" : ""}
            >
              <FormField fieldProps={field} />
            </Grid>
          </Grid>
        ))}
      </FormikProvider>

      <Button
        btnText={t('login.title')}
        sx={{ mt: 2 }}
        className="w-100"
        variant={'contained'}
        onClick={onSubmit}
      />
    </Box>
  );
};

export default PasswordWithLogin;
