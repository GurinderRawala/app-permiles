import React, { FC } from 'react';

import { LoadingOrError } from '../../components/loading';
import { DataGrid } from '../../components/data-grid';
import { GridColDef } from '@mui/x-data-grid';
import { Trailer } from '../../../generated/graphql';
import { FileDownload } from '../../components/file-download';
import { Box } from '@mui/material';
import { useTrucksQuery } from '../hooks';

export const TruckGrid: FC = () => {
  const { data, isError, isLoading } = useTrucksQuery();

  const columns: GridColDef<Trailer>[] = [
    {
      field: 'id',
      headerName: 'ID',
      filterable: false,
      renderCell: params =>
        params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: 'truckNo',
      headerName: 'Truck Number',
      width: 150,
    },
    {
      field: 'make',
      headerName: 'Make',
      width: 100,
    },
    {
      field: 'model',
      headerName: 'Model',
      width: 150,
    },
    {
      field: 'year',
      headerName: 'Year',
      width: 100,
    },
    {
      field: 'vinNumber',
      headerName: 'VIN#',
      width: 200,
      valueGetter: ({ row }) => row.vinNumber || '-',
    },
    {
      field: 'licencePlate',
      headerName: 'License Plate',
      width: 150,
    },
    {
      field: 'licenceState',
      headerName: 'License State',
      width: 100,
    },
    {
      field: 'safetyExpire',
      headerName: 'Safety Expire',
      width: 150,
    },
    {
      field: 'filepath',
      headerName: 'Documents',
      width: 150,
      filterable: false,
      renderCell: ({ row }) => {
        const { filepath } = row;

        if (!filepath?.length) return '-';

        return <FileDownload downloadUrls={filepath as string[]} />;
      },
    },
    {
      field: 'notes',
      headerName: 'Notes',
      filterable: false,
      width: 350,
      valueGetter: ({ row }) => row.notes || '-',
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
            rows={data.trucks || []}
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
