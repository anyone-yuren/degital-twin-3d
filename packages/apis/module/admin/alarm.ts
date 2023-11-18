import { request } from '../request';

export const GetDayAlarm = <T>(params: any) =>
  request.get<T>('/api/SystemWarning/GetSystemWarnInfoByDay', { params });

export const GetNowAlarm = <T>() => request.get<T>('/api/SystemWarning/GetCurrentWarns', {});
export const GetWeekAlarm = <T>(params: any) =>
  request.get<T>('/api/SystemWarning/GetSystemWarnInfoByWeek', { params });
export const GetMonthAlarm = <T>(params: any) =>
  request.get<T>('/api/SystemWarning/GetSystemWarnInfoByMonth', { params });
