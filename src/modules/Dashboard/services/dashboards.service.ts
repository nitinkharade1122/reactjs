import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getDashboardDataAPI,
  getEmpDetails,
  getDashboardDetails,
} from '../apis/DashBoardApi';
import {
  CompanySkillsData,
  CustomerProjectsData,
  EmployeesDetails,
} from '../models/DashboardDetails';

const initialState = {
  dashboardData: [],
  projectDetails: [] as CustomerProjectsData[],
  loadingDashboardData: false,
  companySkillsDetails: [] as CompanySkillsData[],
  employeesDetailsBySkill: [] as EmployeesDetails[],
  isDataRefresh: false,
  totalEmployeeData: {},
  domainSpecProjectsData: {},
  customerSatisfactionData: {},
};

export const getDashboardData = createAsyncThunk(
  'dashboardData/getDashboardData',
  async () => {
    const response = await getDashboardDataAPI();
    return response;
  }
);

export const getProjectsData = createAsyncThunk(
  'dashboardData/getProjectsData',
  async (isDataRefresh: boolean) => {
    const response = await getDashboardDetails(isDataRefresh);
    return response.projectsData;
  }
);

export const getSkillSpecificEmpData = createAsyncThunk(
  'dashboardData/getSkillSpecificEmpData',
  async (skill: string) => {
    const response = await getEmpDetails();
    return response?.employeesData?.filter(
      (emp: EmployeesDetails) => emp?.key === skill
    );
  }
);

export const getCompanySkillsData = createAsyncThunk(
  'dashboardData/getCompanySkillsData',
  async (isDataRefresh: boolean) => {
    const response = await getDashboardDetails(isDataRefresh);
    return response.companySkillsData;
  }
);

export const getTotalEmployeeChartData = createAsyncThunk(
  'dashboard/getTotalEmployeeChartData',
  async (isDataRefresh: boolean) => {
    const response = await getDashboardDetails(isDataRefresh);
    return response.totalEmployees;
  }
);

export const getDomainSpecProjectsData = createAsyncThunk(
  'dashboard/getDomainSpecProjectsData',
  async (isDataRefresh: boolean) => {
    const response = await getDashboardDetails(isDataRefresh);
    return response.domainSpecificProjects;
  }
);

export const getCustomerSatisfactionDetails = createAsyncThunk(
  'dashboard/getCustomerSatisfactionDetails',
  async (isDataRefresh: boolean) => {
    const response = await getDashboardDetails(isDataRefresh);
    return response.customerSatisfaction;
  }
);

export const groupSlice = createSlice({
  name: 'dashboardData',
  initialState,
  reducers: {
    increment: (state: any) => {
      state.value += 1;
    },
    decrement: (state: any) => {
      state.value -= 1;
    },
    incrementByAmount: (state: any, action: any) => {
      state.value += action.payload;
    },
    refreshData: (state) => {
      state.isDataRefresh = !state.isDataRefresh;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.loadingDashboardData = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loadingDashboardData = false;

        if (action.payload) {
          let deviceInfoList = action.payload;
          state.dashboardData = deviceInfoList;
        }
      })
      .addCase(getDashboardData.rejected, (state) => {
        state.loadingDashboardData = false;
      })
      .addCase(getProjectsData.rejected, (state) => {
        state.loadingDashboardData = false;
      })
      .addCase(getProjectsData.pending, (state) => {
        state.loadingDashboardData = true;
      })
      .addCase(getProjectsData.fulfilled, (state, action) => {
        state.loadingDashboardData = false;
        if (action.payload) {
          state.projectDetails = action.payload;
        }
      })
      .addCase(getCompanySkillsData.rejected, (state) => {
        state.loadingDashboardData = false;
      })
      .addCase(getCompanySkillsData.pending, (state) => {
        state.loadingDashboardData = true;
      })
      .addCase(getCompanySkillsData.fulfilled, (state, action) => {
        state.loadingDashboardData = false;
        if (action.payload) {
          state.companySkillsDetails = action.payload;
        }
      })
      .addCase(getSkillSpecificEmpData.rejected, (state) => {
        state.loadingDashboardData = false;
      })
      .addCase(getSkillSpecificEmpData.pending, (state) => {
        state.loadingDashboardData = true;
      })
      .addCase(getSkillSpecificEmpData.fulfilled, (state, action) => {
        state.loadingDashboardData = false;
        if (action.payload) {
          state.employeesDetailsBySkill = action.payload;
        }
      })
      .addCase(getTotalEmployeeChartData.rejected, (state) => {
        state.loadingDashboardData = false;
      })
      .addCase(getTotalEmployeeChartData.pending, (state) => {
        state.loadingDashboardData = true;
      })
      .addCase(getTotalEmployeeChartData.fulfilled, (state, action) => {
        state.loadingDashboardData = false;
        if (action.payload) {
          state.totalEmployeeData = action.payload;
        }
      })
      .addCase(getDomainSpecProjectsData.rejected, (state) => {
        state.loadingDashboardData = false;
      })
      .addCase(getDomainSpecProjectsData.pending, (state) => {
        state.loadingDashboardData = true;
      })
      .addCase(getDomainSpecProjectsData.fulfilled, (state, action) => {
        state.loadingDashboardData = false;
        if (action.payload) {
          state.domainSpecProjectsData = action.payload;
        }
      })
      .addCase(getCustomerSatisfactionDetails.rejected, (state) => {
        state.loadingDashboardData = false;
      })
      .addCase(getCustomerSatisfactionDetails.pending, (state) => {
        state.loadingDashboardData = true;
      })
      .addCase(getCustomerSatisfactionDetails.fulfilled, (state, action) => {
        state.loadingDashboardData = false;
        if (action.payload) {
          state.customerSatisfactionData = action.payload;
        }
      });
  },
});

export const { increment, decrement, incrementByAmount, refreshData } =
  groupSlice.actions;
export default groupSlice.reducer;
