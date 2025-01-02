import axios from 'axios';

// Function to get dashboard data
export const getDashboardDataAPI = async () => {
  try {
    const response = await axios.get('/json/dashboard/crypto.json'); // Correct path
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Function to get employee details
export const getEmpDetails = async () => {
  try {
    const response = await axios.get('/json/dashboard/employees.json'); // Correct path
    return response.data;
  } catch (error) {
    console.error('Error fetching employee details:', error);
    throw error;
  }
};

// Function to get dashboard details with conditional refresh
export const getDashboardDetails = async (isDataRefresh: boolean) => {
  try {
    const endpoint = isDataRefresh
      ? '/json/dashboard/dashboard2.json'
      : '/json/dashboard/dashboard.json'; // Correct path based on condition
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard details:', error);
    throw error;
  }
};
