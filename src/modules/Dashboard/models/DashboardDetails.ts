export type LoadingDashboardData = 'completed' | 'pending' | 'failed';

export type UserDetails = {
  name: string;
  avatar: string;
};

export type ChartData = {
  name: string;
  data: any;
};

interface ChartDataItems extends Array<ChartData> {}

export type Currency = {
  unit: string;
  currency: string;
  currencyLogo: string;
  marketShare: number;
  valueRate: number;

  usdBalance: string;
  currencyBalance: string;

  toUsd: string;
  dailyRate: string;
  chartData: ChartDataItems;
};

export type AccountSecurity = {
  authStatus: string;
  phoneStatus: string;
  emailStatus: string;
};

interface CurrencyItems extends Array<Currency> {}

export type AccountData = {
  status: LoadingDashboardData;
  acBalance: string;
  currencyValue: string;
  currencyUnit: string;
  currentValue: string;
  chartSeries: any;
  currency: CurrencyItems;
};

export type EventData = {
  eventIcon: any;
  eventTitle: string;
  quickLink?: string;
  extraContent?: Element | string;
};

export interface AccountDetails {
  accountDetails: AccountData;
}

export interface WalletDetails {
  walletDetails: CurrencyItems;
}

export interface SecurityDetails {
  securityDetails: AccountSecurity;
}

export interface WatchListDetails {
  watchListDetails: CurrencyItems;
  Watchlistlabel: string[];
}

export interface User {
  user: UserDetails;
}

export interface EventCardProps {
  eventData: EventData[];
  showStepper?: boolean;
}

export type CustomerProjectsData = {
  id: string;
  project_name: string;
  project_manager: string;
  start_date: string;
  end_date: string;
  project_period: string;
  team_size: string;
  project_status: string;
  project_domain: string;
  client_name: string;
};

export type AlertDataType = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  time: string;
};

export interface AlertCardProps {
  alertData: AlertDataType[];
}

export type CompanySkillsData = {
  id: string;
  name: string;
  employees: string;
  available: string;
  unavailable: string;
  projects: string;
};

export type EmployeesDetails = {
  id: string;
  employee_name: string;
  key: string;
  available: string;
  projects: string[];
};

export interface EmployeesSkillDetailsProp {
  empSkillData: EmployeesDetails[];
}
