import { gql } from 'graphql-request';
import { UseGqlMutationOptions, useGqlMutation, useGqlQuery } from '../../api';
import {
  AddBrokerMutation,
  AddBrokerMutationVariables,
  BrokerModifiedInput,
  BrokersQuery,
  DeleteBrokerMutation,
  DeleteBrokerMutationVariables,
  UpdateBrokerMutation,
  UpdateBrokerMutationVariables,
} from '../../generated/graphql';
import { DeepPartial, SubmitHandler, useForm } from 'react-hook-form';
import { UseMutationResult } from 'react-query';
import { useCallback } from 'react';

export const brokerGQL = gql`
  query brokers($where: brokerInput, $orderBy: String) {
    brokers(where: $where, orderBy: $orderBy) {
      id
      name
      email
      phone
      contactname
      streetaddress
      city
      province
      postalcode
      country
    }
  }
`;

export const useBrokerQuery = () =>
  useGqlQuery<BrokersQuery>('brokers', brokerGQL);

export const addBrokerQL = gql`
  mutation addBroker($input: brokerModifiedInput) {
    addBroker(input: $input) {
      id
      name
      email
    }
  }
`;

export declare type UseAddBroker = (
  options?: UseGqlMutationOptions
) => UseMutationResult<
  AddBrokerMutation,
  unknown,
  AddBrokerMutationVariables,
  unknown
>;

export const useAddBroker: UseAddBroker = (options = {}) =>
  useGqlMutation<AddBrokerMutation, unknown, AddBrokerMutationVariables>(
    addBrokerQL,
    options
  );

export const updateBrokerQL = gql`
  mutation updateBroker($input: brokerModifiedInput, $id: String) {
    updateBroker(input: $input, id: $id) {
      id
      name
      email
    }
  }
`;

export declare type UseUpdateBroker = (
  options?: UseGqlMutationOptions
) => UseMutationResult<
  UpdateBrokerMutation,
  unknown,
  UpdateBrokerMutationVariables,
  unknown
>;

export const useUpdateBroker: UseUpdateBroker = (options = {}) =>
  useGqlMutation<UpdateBrokerMutation, unknown, UpdateBrokerMutationVariables>(
    updateBrokerQL,
    options
  );

export declare type BrokerFormHook<T extends 'update' | 'add'> =
  T extends 'update' ? UseUpdateBroker : T extends 'add' ? UseAddBroker : never;

export declare type BrokerFormVariable<T extends 'update' | 'add'> =
  T extends 'update'
    ? UpdateBrokerMutationVariables
    : T extends 'add'
    ? AddBrokerMutationVariables
    : never;

export declare type BrokerFormResponse<T extends 'update' | 'add'> =
  T extends 'update' ? UpdateBrokerMutation : AddBrokerMutation;

export const useBrokerForm = <T extends 'update' | 'add'>(
  useBroker: BrokerFormHook<T>,
  callback: (err?: unknown, res?: BrokerFormResponse<T> | null) => void,
  createBrokerMutationVariables: (
    data: BrokerModifiedInput
  ) => BrokerFormVariable<T>,
  defaultValues?: DeepPartial<BrokerModifiedInput>
) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    reset,
    control,
  } = useForm<BrokerModifiedInput>({
    mode: 'onSubmit',
    defaultValues: defaultValues ? defaultValues : undefined,
  });

  const { data: submitResponse, mutate, isError, isLoading } = useBroker();

  const onSubmit: SubmitHandler<BrokerModifiedInput> = useCallback(
    data => {
      mutate(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        createBrokerMutationVariables(data),
        {
          onSuccess: (res: BrokerFormResponse<T>) => {
            callback(null, res);
            reset();
          },
          onError: (err: unknown) => {
            callback(err);
          },
        }
      );
    },
    [callback, createBrokerMutationVariables, mutate, reset]
  );

  return {
    data: submitResponse,
    isError,
    isLoading,
    onSubmit,
    formErrors,
    handleSubmit,
    register,
    watch,
    control,
  };
};

export const deleteBrokerQL = gql`
  mutation deleteBroker($id: ID!) {
    deleteBroker(id: $id) {
      id
      name
    }
  }
`;

export const useDeleteBroker = (options: UseGqlMutationOptions = {}) =>
  useGqlMutation<DeleteBrokerMutation, unknown, DeleteBrokerMutationVariables>(
    deleteBrokerQL,
    options
  );
