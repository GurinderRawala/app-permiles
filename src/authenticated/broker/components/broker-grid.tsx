import React, { FC } from 'react';

import { LoadingOrError } from '../../components/loading';
import { DataGrid } from '../../components/data-grid';
import { GridColDef } from '@mui/x-data-grid';
import { Broker } from '../../../generated/graphql';
import { Box } from '@mui/material';
import { useBrokerQuery } from '../hooks';
import { BrokerGridActions } from './grid-actions';

export const BrokerGrid: FC = () => {
  const { data, isError, isLoading } = useBrokerQuery();

  const columns: GridColDef<Broker>[] = [
    {
      field: 'id',
      headerName: 'ID',
      filterable: false,
      renderCell: params =>
        params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: 'name',
      headerName: 'Broker Name',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      width: 200,
    },
    {
      field: 'contactname',
      headerName: 'Contact Name',
      width: 250,
    },
    {
      field: 'streetaddress',
      headerName: 'Address',
      minWidth: 300,
      renderCell: ({ row }) => {
        const { streetaddress, city, province, postalcode, country } = row;

        return `${streetaddress}, ${city} ${province} ${postalcode} ${country}`;
      },
    },
    {
      field: ' ',
      headerName: 'Actions',
      minWidth: 150,
      renderCell: ({ row }) => <BrokerGridActions {...{ row }} />,
    },
  ];

  if (isLoading || isError) {
    return (
      <LoadingOrError
        {...{
          isLoading,
          isError,
        }}
      />
    );
  }

  return (
    <>
      {data && (
        <Box sx={{ height: 700 }}>
          <DataGrid
            rows={data.brokers || []}
            columns={columns}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
          />
        </Box>
      )}
    </>
  );
};
