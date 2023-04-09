import type { DocumentNode, GraphQLError } from 'graphql';
import {
  useMutation,
  useQuery,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from 'react-query';

import type { RequestDocument } from 'graphql-request';

import { gqlClient } from '../graphql-client';
import { API_HEADERS } from '../base-url';

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
  TOptions = UseGqlMutationOptions,
>(
  mutationQuery: string | DocumentNode,
  options: TOptions | Record<string, unknown> = {},
) =>
  useMutation<TData, TError, TVariables, TContext>({
    ...options,
    mutationFn: (data) => gqlRequest(mutationQuery, data),
  });

export const useGqlQuery = <
  TQueryFnData = unknown,
  TError = GraphQLError,
  TData extends TQueryFnData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TVariables = unknown,
  TOptions = UseGqlQueryOptions,
>(
  QUERY_KEY: TQueryKey,
  query: string | DocumentNode,
  variables: TVariables,
  options: TOptions | Record<string, unknown> = {},
) =>
  useQuery<TQueryFnData, TError, TData, TQueryKey>({
    ...options,
    queryKey: QUERY_KEY,
    queryFn: async () => gqlRequest<TQueryFnData, TVariables>(query, variables),
  });

export const gqlRequest = <T, V>(
  query: RequestDocument,
  variables: V,
): Promise<T> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  gqlClient.request<T, V>(query, variables, API_HEADERS);
