import { Box, Chip, Grid, Typography } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { FormFieldType } from "src/shared/components/form-field/service/formFieldInterface";
import { Button, FormField } from "src/shared/components/index";
import { DEMO_EMAILS, DEMO_PASSWORDS } from "src/shared/constants/constants";
import * as ROUTES from "../../shared/constants/routes";
import { Dispatch } from "react";


interface LoginProps {
  loginType: string;
  getOtpOnEmail?: (e: any) => void;
  setIsOnEmailScreen?: Dispatch<boolean>;
}

interface LocationState {
  email?: string;
}

const LoginByUserNamePassword = ({ loginType,
  getOtpOnEmail,
  setIsOnEmailScreen }: LoginProps) => {

  const { t } = useTranslation(["english"]);
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = (location.state as LocationState) || {};
  const initialEmail = locationState.email || "";
  const [clickedRole, setClickedRole] = useState(null);

  const initialValue = {
    email: "",
    role: "super-admin",
  };

  //methods
  const formik = useFormik({
    initialValues: initialValue,
    validateOnMount: true,
    onSubmit: (value) => {
      getOtpOnEmail(value);
    },
  });

  const { isValid, handleSubmit, setFieldValue } = formik;

  const handleRoleClick = async (index: number) => {

    const roleEmail = getRoleEmail(index);
    const rolePassword = getRolePassword(index);
    await setFieldValue("email", roleEmail, true);
    await setFieldValue("password", rolePassword, true);
    const route = index === 0 ? ROUTES.ADMIN_LOGIN : ROUTES.LOGIN;
    navigate(route, {
      state: { email: roleEmail, password: rolePassword }
    });


  };

  const getRoleEmail = (index: number) => {
    switch (index) {
      case 0:
        return DEMO_EMAILS.PLATFORM_ADMIN;
      case 1:
        return DEMO_EMAILS.COMPANY_ADMIN;
      case 2:
        return DEMO_EMAILS.USER;
      default:
        return "";
    }
  };

  const getRolePassword = (index: number) => {
    switch (index) {
      case 0:
        return DEMO_PASSWORDS.PLATFORM_ADMIN;
      case 1:
        return DEMO_PASSWORDS.COMPANY_ADMIN;
      case 2:
        return DEMO_PASSWORDS.USER;
      default:
        return "";
    }
  };

  const onSubmit = () => {
    handleSubmit();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (initialEmail) {
      setFieldValue("email", initialEmail);
    }
  }, [initialEmail]);

  useEffect(() => {
    if (initialEmail === DEMO_EMAILS.PLATFORM_ADMIN) {
      setClickedRole(0);
    } else if (initialEmail === DEMO_EMAILS.COMPANY_ADMIN) {
      setClickedRole(1);
    } else if (initialEmail === DEMO_EMAILS.USER) {
      setClickedRole(2);
    }
  }, [initialEmail]);

  const loginRoles = ["Platform Admin", "Company Admin", "User"];

  const loginFormFields: FormFieldType[] = [
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email ID",
      handleKeyDown: handleKeyDown,
      placeholder: "Enter email id",
      validations: {
        required: true,
      },
      errorMessages: {
        requiredErrMsg: "Please enter valid email address*",
        emailErrMsg: "Please enter valid email address*",
      },
    },
  ];

  return (
    <Box>
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

      <Box>
        <Typography sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
          {t("login.loginAs")}
        </Typography>

        {loginRoles.map((role, index) => (
          <Chip
            key={index}
            label={role}
            onClick={() => handleRoleClick(index)}
            sx={{
              marginLeft: 2,
              marginTop: "5px",
              backgroundColor:
                clickedRole === index ? "primary.main" : "default",
              color: clickedRole === index ? "white" : "black",
              "&:hover": {
                backgroundColor:
                  clickedRole === index
                    ? "primary.dark"
                    : "rgba(0, 0, 0, 0.08)",
              },
            }}
          ></Chip>
        ))}
      </Box>

      <Button
        btnText={t("login.continueBtnText")}
        disabled={!isValid}
        sx={{ mt: 5 }}
        className="w-100"
        variant={"contained"}
        onClick={onSubmit}
      />
    </Box>
  );
};

export default LoginByUserNamePassword;
