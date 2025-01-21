import { FormFieldType } from '../components/form-field/service/formFieldInterface';
import { TENANT, USER } from './routes';

export const formFieldsByRoute: Record<string, FormFieldType[]> = {
  [TENANT]: [
    {
      id: 'tenantName',
      name: 'tenantName',
      type: 'text',
      label: 'Tenant Name',
      placeholder: 'Enter tenant name',
      validations: {
        required: true,
      },
      errorMessages: {
        requiredErrMsg: 'Tenant name is required',
      },
    },
  ],
  [USER]: [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter name',
      validations: {
        required: true,
      },
      errorMessages: {
        requiredErrMsg: 'Name is required',
      },
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter email address',
      validations: {
        required: true,
        email: true,
      },
      errorMessages: {
        requiredErrMsg: 'Email is required',
        emailErrMsg: 'Please enter a valid email address',
      },
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter Password',
      validations: {
        required: true,
        password: true,
      },
      errorMessages: {
        requiredErrMsg: 'Password is required',
        emailErrMsg: 'Please enter a valid password',
      },
    },
    {
      id: 'tenant',
      name: 'tenant',
      type: 'select',
      label: 'Tenant',
      options: [],
      itemLabelKey: 'label',
      itemValueKey: 'value',
      validations: {
        required: true,
      },
      errorMessages: {
        requiredErrMsg: 'Tenant is required',
      },
    },
    {
      id: 'role',
      name: 'role',
      type: 'select',
      label: 'Role',
      options: [],
      itemLabelKey: 'label',
      itemValueKey: 'value',
      validations: {
        required: true,
      },
      errorMessages: {
        requiredErrMsg: 'Role is required',
      },
    },
  ],
};

export const initialValuesByRoute: Record<string, any> = {
  [TENANT]: {
    tenantName: '',
  },
  [USER]: {
    name: '',
    email: '',
    role: '',
  },
};

export const editUserNameField: FormFieldType = {
  id: 'name',
  name: 'name',
  type: 'text',
  label: 'Name',
  placeholder: 'Enter name',
  validations: {
    required: true,
  },
  errorMessages: {
    requiredErrMsg: 'Name is required',
  },
};

export const editUserTenantAndRoleFields: FormFieldType[] = [
  {
    id: 'tenant',
    name: 'tenant',
    type: 'select',
    label: 'Tenant',
    options: [],
    itemLabelKey: 'label',
    itemValueKey: 'value',
    validations: {
      required: true,
    },
    errorMessages: {
      requiredErrMsg: 'Tenant is required',
    },
  },
  {
    id: 'role',
    name: 'role',
    type: 'select',
    label: 'Role',
    options: [],
    itemLabelKey: 'label',
    itemValueKey: 'value',
    validations: {
      required: true,
    },
    errorMessages: {
      requiredErrMsg: 'Role is required',
    },
  },
];

export const editUserFormFields: FormFieldType[] = [
  editUserNameField,
  ...editUserTenantAndRoleFields,
];

export const addAuthConfigFormFields: FormFieldType[] = [
  {
    id: 'tenant',
    name: 'tenant',
    type: 'select',
    label: 'Tenant',
    options: [],
    itemLabelKey: 'label',
    itemValueKey: 'value',
    validations: {
      required: true,
    },
    errorMessages: {
      requiredErrMsg: 'Tenant is required',
    },
  },
  {
    id: 'domains',
    name: 'domains',
    type: 'textarea',
    label: 'Domains(comma separated multiple domains)',
    validations: {
      required: true,
    },
    errorMessages: {
      requiredErrMsg: 'Domain is required',
    },
  },
  {
    id: 'certificate',
    name: 'certificate',
    type: 'textarea',
    label: 'Certificate',
    validations: {
      required: true,
    },
    errorMessages: {
      requiredErrMsg: 'Certificate is required',
    },
  },
  {
    id: 'issuer',
    name: 'issuer',
    type: 'textarea',
    label: 'Issuer',
    validations: {
      required: true,
    },
    errorMessages: {
      requiredErrMsg: 'Issuer is required',
    },
  },
  {
    id: 'entryPoint',
    name: 'entryPoint',
    type: 'textarea',
    label: 'Entry Point',
    options: [],
    validations: {
      required: true,
    },
    errorMessages: {
      requiredErrMsg: 'Entry Point is required',
    },
  },
];
