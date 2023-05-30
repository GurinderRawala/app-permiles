import { gql } from 'graphql-request';
import { useGqlMutation, useGqlQuery, useHttpQuery } from '../../api';
import {
  AddTrailerMutation,
  TrailersQuery,
  TrucksQuery,
} from '../../generated/graphql';

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
  mutation addTrailer($input: trailerInput) {
    addTrailer(input: $input) {
      id
    }
  }
`;

export const useAddTrailer = () => {
  const { mutate, isError, isLoading } = useGqlMutation<AddTrailerMutation>(
    trailerMutationGQL,
    {
      queryKey: 'addTrailer',
    }
  );

  return {
    addTrailer: mutate,
    isError,
    isLoading,
  };
};

export const useLoginOnce = () => {
  const query = useHttpQuery('loginQuery', '/user-accounts/signin', 'POST', {
    email: 'gurinderrawala@gmail.com',
    password: 'Rawala',
  });

  console.log(query.data);
};
