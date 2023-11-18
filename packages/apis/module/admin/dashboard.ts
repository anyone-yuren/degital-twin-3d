import { request } from '../request';

export const GetAreaLocationSummary = <T>(params: any) =>
  request.get<T>('/api/Area/GetAreaLocationSummary', params);

export const GetAreaLocationWeekSummary = <T>(params: any) =>
  request.get<T>('/api/Area/GetAreaLocationWeekSummary', params);

export const CurrentTaskSummary = <T>(params: any) =>
  request.get<T>('/api/Summary/CurrentTaskSummary', params);

export const GetSystemWarnInfoByDay = <T>(params: any) =>
  request.get<T>('/api/SystemWarning/GetSystemWarnInfoByDay', params);

export const GetAreaLocationAlarmsSummary = <T>(params: any) =>
  request.get<T>('/api/Area/GetAreaLocationAlarmsSummary', params);

export const GetCurrentLocationSummary = <T>(params: any) =>
  request.get<T>('/api/Summary/GetCurrentLocationSummary', params);
export const GetInventoryInOutSumPeriod = <T>(params: any) =>
  request.post<T>('/api/Storage/GetInventoryInOutSumPeriod', params);

export const GetDigital_Equipment = <T>(params: any) =>
  request.get<T>('/api/Digital_Equipment/GetDigital_Equipment', params);

export const GetDailyTaskSummary = <T>() => request.get<T>('/api/Summary/GetDailyTaskSummary');
