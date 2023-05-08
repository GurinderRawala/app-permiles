import { gql } from 'graphql-request';
import { useGqlQuery } from '../../api';
import { BrokersQuery } from '../../generated/graphql';

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
