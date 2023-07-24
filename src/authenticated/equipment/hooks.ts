import { gql } from 'graphql-request';
import { useGqlMutation, useGqlQuery, useHttpQuery } from '../../api';
import {
  AddTrailerMutation,
  AddTrailerMutationVariables,
  AddTruckMutation,
  AddTruckMutationVariables,
  InputMaybe,
  TrailerModifiedInput,
  TrailersQuery,
  TruckModifiedInput,
  TrucksQuery,
  UpdateTrailerMutation,
  UpdateTrailerMutationVariables,
  UpdateTruckMutation,
  UpdateTruckMutationVariables,
} from '../../generated/graphql';
import { UseMutateFunction } from 'react-query';
import { DeepPartial, SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  UploadResponse,
  mutateUploadFile,
  useFileUpload,
} from '../hooks/file-upload-hook';

export const trailerGQL = gql`
  query trailers($where: trailerInput, $orderBy: String) {
    trailers(where: $where, orderBy: $orderBy) {
      id
      trailerNo
      trailerAttributes
      model
      make
      year
      vinNumber
      licencePlate
      licenceState
      safetyExpire
      filepath
      notes
    }
  }
`;

export const useTrailerQuery = () => {
  const query = useGqlQuery<TrailersQuery>('trailers', trailerGQL);

  return query;
};

export const truckGQL = gql`
  query trucks($where: truckInput, $orderBy: String) {
    trucks(where: $where, orderBy: $orderBy) {
      id
      model
      make
      year
      truckNo
      vinNumber
      licencePlate
      licenceState
      safetyExpire
      filepath
      notes
    }
  }
`;

export const useTrucksQuery = () => {
  const query = useGqlQuery<TrucksQuery>('trucks', truckGQL);
  return query;
};

export const trailerMutationGQL = gql`
  mutation addTrailer($input: trailerModifiedInput) {
    addTrailer(input: $input) {
      id
    }
  }
`;

export declare type UseAddTrailer = () => {
  mutate: UseMutateFunction<
    AddTrailerMutation,
    unknown,
    AddTrailerMutationVariables
  >;
  isError: boolean;
  isLoading: boolean;
  data?: AddTrailerMutation;
};

export const useAddTrailer: UseAddTrailer = () => {
  const { mutate, isError, isLoading, data } = useGqlMutation<
    AddTrailerMutation,
    unknown,
    AddTrailerMutationVariables
  >(trailerMutationGQL, {
    queryKey: 'addTrailer',
  });

  return {
    mutate,
    isError,
    isLoading,
    data,
  };
};

export const truckMutationGQL = gql`
  mutation addTruck($input: truckModifiedInput) {
    addTruck(input: $input) {
      id
    }
  }
`;

export declare type UseAddTruck = () => {
  mutate: UseMutateFunction<
    AddTruckMutation,
    unknown,
    AddTruckMutationVariables
  >;
  isError: boolean;
  isLoading: boolean;
  data?: AddTruckMutation;
};

export const useAddTruck: UseAddTruck = () => {
  const { mutate, isError, isLoading, data } = useGqlMutation<
    AddTruckMutation,
    unknown,
    AddTruckMutationVariables
  >(truckMutationGQL, {
    queryKey: 'addTruck',
  });

  return {
    mutate,
    isError,
    isLoading,
    data,
  };
};

export const updateTrailerGQL = gql`
  mutation updateTrailer($input: trailerModifiedInput, $id: String) {
    updateTrailer(input: $input, id: $id) {
      id
      trailerNo
    }
  }
`;

export declare type UseUpdateTrailer = () => {
  mutate: UseMutateFunction<
    UpdateTrailerMutation,
    unknown,
    UpdateTrailerMutationVariables
  >;
  isError: boolean;
  isLoading: boolean;
  data?: UpdateTrailerMutation;
};

export const useUpdateTrailer: UseUpdateTrailer = () => {
  const { mutate, isError, isLoading, data } = useGqlMutation<
    UpdateTrailerMutation,
    unknown,
    UpdateTrailerMutationVariables
  >(updateTrailerGQL, {
    queryKey: 'updateTrailer',
  });

  return {
    mutate,
    isError,
    isLoading,
    data,
  };
};

export const updateTruckGQL = gql`
  mutation updateTruck($input: truckModifiedInput, $id: String) {
    updateTruck(input: $input, id: $id) {
      id
      truckNo
    }
  }
`;

export declare type UseUpdateTruck = () => {
  mutate: UseMutateFunction<
    UpdateTruckMutation,
    unknown,
    UpdateTruckMutationVariables
  >;
  isError: boolean;
  isLoading: boolean;
  data?: UpdateTruckMutation;
};

export const useUpdateTruck: UseUpdateTruck = () => {
  const { mutate, isError, isLoading, data } = useGqlMutation<
    UpdateTruckMutation,
    unknown,
    UpdateTruckMutationVariables
  >(updateTruckGQL, {
    queryKey: 'updateTruck',
  });

  return {
    mutate,
    isError,
    isLoading,
    data,
  };
};

export type EquipmentFormHookName =
  | 'addTrailer'
  | 'addTruck'
  | 'updateTrailer'
  | 'updateTruck';

export type EquipmentInputDataName = 'trailerInput' | 'truckInput';

export declare type UseAddEditEquipmentHook<T extends EquipmentFormHookName> =
  T extends 'addTrailer'
    ? UseAddTrailer
    : T extends 'addTruck'
    ? UseAddTruck
    : T extends 'updateTrailer'
    ? UseUpdateTrailer
    : T extends 'updateTruck'
    ? UseUpdateTruck
    : never;

export declare type EquipmentMutationVariables<
  T extends EquipmentFormHookName
> = T extends 'addTrailer'
  ? AddTrailerMutationVariables
  : T extends 'addTruck'
  ? AddTruckMutationVariables
  : T extends 'updateTrailer'
  ? UpdateTrailerMutationVariables
  : T extends 'updateTruck'
  ? UpdateTruckMutationVariables
  : never;

export type EquipmentFormSubmittedData<
  T extends 'trailerInput' | 'truckInput'
> = T extends 'trailerInput'
  ? InputMaybe<TrailerModifiedInput> & { files: FileList }
  : InputMaybe<TruckModifiedInput> & { files: FileList };

export type CreateEquipmentMutationVariables<
  T extends EquipmentFormHookName,
  D extends 'trailerInput' | 'truckInput'
> = (data: EquipmentFormSubmittedData<D>) => EquipmentMutationVariables<T>;

export const useEquipmentForm = <
  T extends EquipmentFormHookName,
  D extends EquipmentInputDataName
>(
  useAddEquipmentHook: UseAddEditEquipmentHook<T>,
  repoKey: string,
  fieldToUpdate: string,
  callback: (
    res: AddTrailerMutation | AddTruckMutation | UploadResponse[] | null,
    err?: unknown
  ) => void,
  createEquipmentMutationVariables: CreateEquipmentMutationVariables<T, D>,
  defaultValues?: DeepPartial<EquipmentFormSubmittedData<D>>
) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm<EquipmentFormSubmittedData<D>>({
    mode: 'onSubmit',
    defaultValues: defaultValues ? defaultValues : undefined,
  });
  const {
    data: submitResponse,
    mutate,
    isError,
    isLoading,
  } = useAddEquipmentHook();

  const recordId = useMemo(() => {
    if (!submitResponse) return '';

    if ('addTrailer' in submitResponse) {
      return submitResponse.addTrailer?.id || '';
    }

    if ('addTruck' in submitResponse) {
      return submitResponse.addTruck?.id || '';
    }

    return '';
  }, [submitResponse]);

  const {
    uploadFiles,
    isError: isFileUploadError,
    isLoading: isFileUploadLoading,
  } = useFileUpload({
    recordId,
    repo: repoKey,
  });

  const [fileList, setFileList] = useState<FileList | null>(null);

  const onSubmit: SubmitHandler<EquipmentFormSubmittedData<D>> = useCallback(
    data => {
      console.log({ data });
      if (data?.files) {
        setFileList(data?.files);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      mutate(createEquipmentMutationVariables(data), {
        onError: (err: unknown) => {
          console.error({ err }, 'Error submitting form');
          callback(null, err);
        },
        onSuccess: (res: AddTrailerMutation | AddTruckMutation) => {
          callback(res);
          if (!data?.files) {
            reset();
          }
        },
      });
    },
    []
  );

  useEffect(() => {
    if (!recordId.length || !fileList?.length) return;

    mutateUploadFile(
      {
        fieldToUpdate,
        files: fileList,
      },
      uploadFiles,
      (res, err) => {
        if (err) return callback(null, err);
        callback(res);
        reset();
      }
    );
  }, [recordId, fileList]);

  return {
    data: submitResponse,
    isError,
    isLoading,
    onSubmit,
    formErrors,
    handleSubmit,
    register,
    isFileUploadError,
    isFileUploadLoading,
  };
};

export const useLoginOnce = () => {
  const query = useHttpQuery('loginQuery', '/user-accounts/signin', 'POST', {
    email: 'gurinderrawala@gmail.com',
    password: 'Rawala',
  });

  console.log(query.data);
};
