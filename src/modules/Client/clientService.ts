import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
} from 'src/shared/utils/api-request';
import {
  ClientCreateDto,
  ClientDto,
  ClientEndpoints,
  ClientUpdateDto,
} from 'src/shared/constants/clientTypes';

/**
 * Fetches all clients
 */
export const getAllClientsAPI = async (): Promise<ClientDto[]> => {
  try {
    const response = await apiGet(ClientEndpoints.BASE);
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

/**
 * Fetches a client by ID
 */
export const getClientByIdAPI = async (id: string): Promise<ClientDto> => {
  try {
    const response = await apiGet(`${ClientEndpoints.BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching client with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new client
 */
export const createClientAPI = async (
  client: ClientCreateDto
): Promise<ClientDto> => {
  try {
    const response = await apiPost(ClientEndpoints.BASE, client);
    return response.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

/**
 * Updates an existing client
 */
export const updateClientAPI = async (
  id: string,
  client: ClientUpdateDto
): Promise<ClientDto> => {
  try {
    const response = await apiPut(`${ClientEndpoints.BASE}/${id}`, client);
    return response.data;
  } catch (error) {
    console.error(`Error updating client with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a client
 */
export const deleteClientAPI = async (id: string): Promise<void> => {
  try {
    await apiDelete(`${ClientEndpoints.BASE}/${id}`);
  } catch (error) {
    console.error(`Error deleting client with ID ${id}:`, error);
    throw error;
  }
};
