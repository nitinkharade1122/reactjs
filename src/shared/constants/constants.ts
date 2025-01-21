export const SERVER_API_URL = import.meta.env.VITE_APP_SERVER_API_URL;

export const USERPOOL_ID = import.meta.env.VITE_APP_USERPOOL_ID;

export const USERPOOL_WEBCLIENT_ID = import.meta.env
  .VITE_APP_USERPOOL_WEBCLIENT_ID;

export const HEADER_AUTHORIZATION = 'a64bccc5-1648-46ae-ad78-b0f890f1d6c1';

export const AWS_REGION = 'us-west-2';
export const AWS_CONFIG = {
  aws_appsync_graphqlEndpoint: import.meta.env
    .VITE_APP_AWS_APPSYNC_GRAPHQLENDPOINT,

  aws_appsync_region: import.meta.env.VITE_APP_AWS_APPSYNC_REGION,

  aws_appsync_authenticationType: import.meta.env
    .VITE_APP_AWS_AUTHENTICATIONTYPE,

  aws_appsync_apiKey: import.meta.env.VITE_APP_AWS_APPSYNC_APIKEY,
};

export const DEVSTAGE_USERPOOL_ID = 'us-west-2_R4zfKO1hy';
export const QASTAGE_USERPOOL_ID = 'us-west-2_R4zfKO1hy';
export const CLINICALUSER_STAGE_USERPOOL_ID = 'us-west-2_VU5TDSRwJ';

export const DEVSTAGE_USERPOOL_WEBCLIENT_ID = '34jp7c8060jmgqu9bnhjptrotc';

export const QASTAGE_USERPOOL_WEBCLIENT_ID = '34jp7c8060jmgqu9bnhjptrotc';

export const CLINICALUSER__USERPOOL_WEBCLIENT_ID = '34jp7c8060jmgqu9bnhjptrotc';

export const LOGIN = import('src/auth/login/Login');
export const SIGNUP = import('src/auth/login/SignUp');

export const TRANSACTIONS = import(
  'src/modules/Transactions/ApplicationsTransactions'
);
export const ERROR_PAGE = import('src/modules/ErrorPage/ErrorPage');

export const COMPLETED = 'completed';
export const SUCCESS = 'success';
export const ERROR = 'error';
export const WARNING = 'warning';
export enum statusLable {
  COMPLETED = 'completed',
  PENDING = 'pending',
  FAILED = 'failed',
}

export const PASSWORD_STRENGTH_LABEL_BY_SCORE: Record<number, string> = {
  0: 'weak',
  1: 'weak',
  2: 'fair',
  3: 'good',
  4: 'strong',
};

export const REGEX = {
  EMAIL:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NUMBER_DECIMAL:
    /^(?:\d{1,2}(?:\.\d{1,2})?|100(?:\.0{1,2})?|0(?:\.\d{1,2})?)$/,
  NUMBER_INTEGER: /^(?:\d*[1-9]\d*|)$/,
  TEXT_ONLY: /^[a-zA-Z ]*$/,
  ALPHA_NUMBERICS: /^[a-zA-Z0-9-_ ]*$/,
  PASSWORD:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?!.*\s).{8,}$/,
  JSON: /^[\],:{}\s]*$|^"(.|\\[\\"/bfnrt])*"$/,
};

export const MEGABYTE_CONVERTER = 1000000;

export const FIELD_TYPE = {
  TEXT: 'text',
  ALPHA_NUMBERICS: 'alphanumerics',
  RADIO: 'radio',
  EMAIL: 'email',
  SWITCH: 'switch',
  SELECT: 'select',
  REGEX: 'regex',
  PASSWORD: 'password',
  CHECKBOX: 'checkbox',
  TEXTAREA: 'textarea',
  NUMBER_ONLY: 'number_only',
  INTEGER_ONLY: 'integer_only',
  MULTI_SELECT: 'multi-select',
  AUTOCOMPLETE: 'autocomplete',
  CHECKBOX_GROUP: 'checkbox_group',
};

export const DEMO_EMAILS = {
  PLATFORM_ADMIN: 'aakanksha.thokare@indexnine.com',
  COMPANY_ADMIN: 'blackwidow@email.com',
  USER: 'spiderman@email.com',
};

export const DEMO_PASSWORDS = {
  PLATFORM_ADMIN: 'ironman@123',
  COMPANY_ADMIN: 'blackwidow@123',
  USER: 'spiderman@123',
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  SuperAdmin = 'SUPER_ADMIN',
}
