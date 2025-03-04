import {
  apiGet,
  apiPost,
  apiDelete,
  apiPut,
} from '../../../shared/utils/api-request';

interface TenantRole {
  tenantId: number;
  roles: string[];
}

export interface User {
  tenantIds: number[];
  id: number;
  email: string;
  name: string;
  tenantRoles: TenantRole[];
}

interface UserApiResponse {
  users: User[];
}

export const getTenantAPI = async () => {
  try {
    const response = await apiGet('/api/v1/tenants/list');
    return response.data.map((tenant: any) => ({
      tenant: tenant.name,
      id: tenant.id,
    }));
  } catch (error) {
    console.error('Error fetching tenants:', error);
    return [];
  }
};

export const deleteTenantAPI = async (tenantId: number) => {
  try {
    await apiDelete(`/api/v1/tenants/${tenantId}`);
  } catch (error) {
    console.error('Error deleting tenant:', error);
    alert('Users are associated with this tenant, please delete users first');
  }
};

export const addTenantAPI = async (values: any) => {
  try {
    const response = await apiPost('/api/v1/tenants', {
      name: values.tenantName,
    });
    return response;
  } catch (error) {
    console.error('Error adding tenant:', error);
  }
};

export const editTenantAPI = async (tenantId: number, name: string) => {
  try {
    await apiPut(`/api/v1/tenants/${tenantId}`, { name });
  } catch (error) {
    console.error('Error deleting tenant:', error);
  }
};

export const getUserAPI = async (page: number, limit: number) => {
  try {
    const response = await apiGet<UserApiResponse>(
      `/api/v1/users/list?page=${page}&limit=${limit}`
    );

    const data = response.data.users.map((user) => ({
      user: user.name,
      id: user.id,
      role: user.tenantRoles[0]?.roles[0] || 'No Role',
      tenantId: user.tenantRoles[0]?.tenantId || 'No Tenant',
      tenantRoles: user.tenantRoles,
      fullUserData: user,
    }));

    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const deleteUserAPI = async (userId: number) => {
  try {
    await apiDelete(`/api/v1/users/${userId}`);
  } catch (error) {
    console.error('Error deleting tenant:', error);
  }
};

export const addUserAPI = async (values: any) => {
  const requestBody = {
    name: values.name,
    email: values.email,
    password: values.password,
    tenantRoles: [
      {
        tenantId: Number(values.tenant),
        roles: [String(values.role)],
      },
    ],
  };

  try {
    const response = await apiPost('/api/v1/users', requestBody);
    return response;
  } catch (error) {
    console.error('Error adding tenant:', error);
  }
};

export const editUserAPI = async (
  userId: number,
  name: string,
  tenantRoles: { tenantId: number; roles: string[] }[]
) => {
  try {
    const requestBody = {
      name,
      tenantRoles,
    };

    await apiPut(`/api/v1/users/${userId}`, requestBody);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const getRoleAPI = async () => {
  try {
    const response = await apiGet('/api/v1/roles');
    return response.data.map((role: any) => ({
      role: role.name,
      id: role.id,
    }));
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
};

export const addTenantAuthConfig = async (tenantAuthConfigData: {
  tenantId: number;
  domains: string[];
  cert: string;
  issuer: string;
  entryPoint: string;
}) => {
  try {
    const response = await apiPost(
      '/api/v1/tenant-auth-config',
      tenantAuthConfigData
    );
    return response.data;
  } catch (error) {
    console.error('Error creating tenant auth config:', error);
    throw error;
  }
};
