import React, { FC } from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { CircularProgress, IconButton } from '@mui/material';
import { useQueries } from 'react-query';
import { saveAs } from 'file-saver';
import { api } from '../../api';

export interface FileDownloadProps {
  downloadUrls: string[];
}

export const FileDownload: FC<FileDownloadProps> = ({ downloadUrls }) => {
  const { onDownload, isError, isLoading } = useFileDownload(downloadUrls);

  return (
    <IconButton size="small" onClick={onDownload}>
      {isLoading && !isError ? (
        <CircularProgress size={12} />
      ) : (
        <CloudDownloadIcon />
      )}
    </IconButton>
  );
};

export const useFileDownload = (downloadUrls: string[]) => {
  const awsFileKeys = downloadUrls.map(url => JSON.parse(url).key);

  const queries = useQueries(
    awsFileKeys.map(key => ({
      queryKey: ['file', key],
      queryFn: async () => {
        const response = await api.post(
          '/get-file',
          {
            filePath: key,
          },
          { responseType: 'blob' }
        );

        return response.data;
      },
    }))
  );

  const onDownload = () => {
    queries.forEach((query, index) => {
      const fileData = query.data;
      const filename =
        awsFileKeys[index].split('/')[awsFileKeys[index].split('/').length - 1];
      saveAs(fileData, filename);
    });
  };

  return {
    onDownload,
    isLoading: queries.some(query => query.isLoading),
    isError: queries.some(query => query.isError),
  };
};
