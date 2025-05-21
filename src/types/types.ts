export interface IAuthContextType {
  isAuthenticated: boolean;
  setAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAuthStatus {
  isAuthenticated: boolean;
  hasAccessToken: boolean;
  hasRefreshToken: boolean;
  shouldRefresh: boolean;
}

export interface ISearchParams {
  offset: number;
  term: string;
  sortValue: string;
  colors: string[];
  sizes: string[];
  brands: string[];
  prices: [number, number];
}
