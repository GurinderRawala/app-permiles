import React, { FC, useState } from 'react';
import {
  DataGrid as DG,
  GridFilterModel,
  GridToolbar,
  DataGridProps as DGprops,
} from '@mui/x-data-grid';

export interface DataGridProps extends DGprops {
  filterModelDefault?: GridFilterModel;
}

export const DataGrid: FC<DataGridProps> = ({
  filterModelDefault = { items: [] },
  ...props
}) => {
  const [filterModel, setFilterModel] =
    useState<GridFilterModel>(filterModelDefault);

  return (
    <DG
      {...props}
      initialState={{
        ...props.initialState,
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      slots={{
        toolbar: GridToolbar,
      }}
      filterModel={filterModel}
      onFilterModelChange={newFilterModel => setFilterModel(newFilterModel)}
      pagination
      autoPageSize
    />
  );
};
