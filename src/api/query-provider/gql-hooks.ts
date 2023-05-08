import type { DocumentNode, GraphQLError } from 'graphql';
import {
  useMutation,
  useQuery,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from 'react-query';

import type { RequestDocument, Variables } from 'graphql-request';

import { gqlClient } from '../graphql-client';
import { API_HEADERS } from '../base-url';
import { VariablesAndRequestHeadersArgs } from 'graphql-request/build/esm/types';

export type UseGqlMutationOptions = Omit<UseMutationOptions, 'mutationFn'>;
export type UseGqlQueryOptions = Omit<
  UseQueryOptions,
  'queryKey' | 'queryFn' | 'onError'
>;

export const useGqlMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
  TOptions = UseGqlMutationOptions
>(
  mutationQuery: string | DocumentNode,
  options: TOptions | Record<string, unknown> = {}
) =>
  useMutation<TData, TError, TVariables, TContext>({
    ...options,
    mutationFn: data => gqlRequest(mutationQuery, { input: data }),
  });

export const useGqlQuery = <
  TQueryFnData = unknown,
  TError = GraphQLError,
  TData extends TQueryFnData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TVariables extends Variables = Variables,
  TOptions = UseGqlQueryOptions
>(
  QUERY_KEY: TQueryKey,
  query: string | DocumentNode,
  variables: TVariables = {} as TVariables,
  options: TOptions | Record<string, unknown> = {}
) =>
  useQuery<TQueryFnData, TError, TData, TQueryKey>({
    ...options,
    queryKey: QUERY_KEY,
    queryFn: async () => gqlRequest<TQueryFnData, TVariables>(query, variables),
  });

export const gqlRequest = <T, V extends Variables>(
  query: RequestDocument,
  variables: V
): Promise<T> => {
  const variablesAndHeaders = [
    variables,
    API_HEADERS as Required<RequestInit>['headers'],
  ] as unknown as VariablesAndRequestHeadersArgs<V>;

  return gqlClient.request<T, V>(query, ...variablesAndHeaders);
};
