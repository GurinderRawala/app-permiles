import React, { FC } from 'react';
import { useTrailerQuery } from '../hooks';
import { LoadingOrError } from '../../components/loading';
import { Box } from '@mui/material';
import { DataGrid } from '../../components/data-grid';
import { GridColDef } from '@mui/x-data-grid';
import { Trailer } from '../../../generated/graphql';
import { FileDownload } from '../../components/file-download';

export const TrailerGrid: FC = () => {
  const { data, isError, isLoading } = useTrailerQuery();

  const columns: GridColDef<Trailer>[] = [
    {
      field: 'id',
      headerName: 'ID',
      filterable: false,
      renderCell: params =>
        params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: 'trailerNo',
      headerName: 'Trailer Number',
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
      width: 200,
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
    },
    {
      field: 'licencePlate',
      headerName: 'License Plate',
      width: 100,
    },
    {
      field: 'licenceState',
      headerName: 'License State',
      width: 100,
    },
    {
      field: 'safetyExpire',
      headerName: 'Safety Expire',
      width: 220,
    },
    {
      field: 'filepath',
      headerName: 'Documents',
      width: 200,
      filterable: false,
      renderCell: ({ row }) => {
        const { filepath } = row;

        if (!filepath?.length) return null;

        return <FileDownload downloadUrls={filepath as string[]} />;
      },
    },
    {
      field: 'notes',
      headerName: 'Notes',
      width: 220,
      filterable: false,
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
    <Box p={3}>
      {data && (
        <DataGrid
          rows={data.trailers || []}
          columns={columns}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
        />
      )}
    </Box>
  );
};
