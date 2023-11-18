import { request } from '../request';
import { AdminApi } from './typing';

export * from './dashboard';
export * from './alarm';

export const getGithubIssueItem = (params: AdminApi.IGetGithubIssueItemType) =>
  request<{
    data: AdminApi.GithubIssueItem[];
  }>('https://proapi.azurewebsites.net/github/issues', {
    params,
  });
