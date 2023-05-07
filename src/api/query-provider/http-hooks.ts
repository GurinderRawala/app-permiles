import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { api } from '../base-url';

export type UseHttpQueryOptions = Omit<
  UseQueryOptions,
  'queryKey' | 'queryFn' | 'onError'
>;

export type UseHttpMutationOptions = Omit<UseMutationOptions, 'mutationFn'>;

export const useHttpMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
  TOptions = UseHttpMutationOptions
>(
  url: string,
  method: string,
  options: TOptions | Record<string, unknown> = {}
) =>
  useMutation<TData, TError, TVariables, TContext>({
    ...options,
    mutationFn: data => httpRequest<TData, TVariables>(url, method, data),
  });

export const useHttpQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData extends TQueryFnData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TVariables = undefined,
  TOptions = UseHttpQueryOptions
>(
  QUERY_KEY: TQueryKey,
  url: string,
  method: string,
  variables: TVariables,
  options: TOptions | Record<string, unknown> = {}
) =>
  useQuery<TQueryFnData, TError, TData, TQueryKey>({
    ...options,
    queryKey: QUERY_KEY,
    queryFn: async () =>
      await httpRequest<TQueryFnData, TVariables>(method, url, variables),
  });

export const httpRequest = <T, V>(
  method: string,
  url: string,
  variables: V
): Promise<T> =>
  api({
    method,
    url,
    data: variables,
  });
