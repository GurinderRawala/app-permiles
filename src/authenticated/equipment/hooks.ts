import { gql } from 'graphql-request';
import { useGqlMutation, useGqlQuery, useHttpQuery } from '../../api';
import {
  AddTrailerMutation,
  AddTruckMutation,
  TrailerInput,
  TrailersQuery,
  TruckInput,
  TrucksQuery,
} from '../../generated/graphql';
import { UseMutateFunction } from 'react-query';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { omit } from 'lodash';
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
  mutate: UseMutateFunction<AddTrailerMutation, unknown, TrailerInput>;
  isError: boolean;
  isLoading: boolean;
  data?: AddTrailerMutation;
};

export const useAddTrailer: UseAddTrailer = () => {
  const { mutate, isError, isLoading, data } = useGqlMutation<
    AddTrailerMutation,
    unknown,
    TrailerInput
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
  mutate: UseMutateFunction<AddTruckMutation, unknown, TruckInput>;
  isError: boolean;
  isLoading: boolean;
  data?: AddTruckMutation;
};

export const useAddTruck: UseAddTruck = () => {
  const { mutate, isError, isLoading, data } = useGqlMutation<
    AddTruckMutation,
    unknown,
    TruckInput
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

export const useEquipmentForm = <T extends UseAddTrailer | UseAddTruck>(
  useAddEquipmentHook: T,
  repoKey: string,
  fieldToUpdate: string,
  callback: (
    res: AddTrailerMutation | AddTruckMutation | UploadResponse[] | null,
    err?: unknown
  ) => void
) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    mode: 'onSubmit',
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

  const onSubmit: SubmitHandler<FieldValues> = useCallback(data => {
    console.log({ data });
    if (data?.files) {
      setFileList(data?.files);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutate(omit(data, 'files'), {
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
  }, []);

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
