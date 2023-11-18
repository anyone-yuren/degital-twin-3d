export declare namespace AdminApi {
  type ParamsType = Record<string, any>;

  type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
      name: string;
      color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
  };

  type IGetGithubIssueItemType = ParamsType & {
    pageSize: number | undefined;
    current: number | undefined;
    keyword: string | undefined;
  };
}
