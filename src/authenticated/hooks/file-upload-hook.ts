import { UseMutateFunction } from 'react-query';
import { useHttpMutation } from '../../api';

export declare type FileUploadParams = {
  recordId: string; // uuid of the record where updating filepath
  repo: string; // name of the model
};

export interface UploadResponseData {
  /**
   * URL of the uploaded object.
   */
  Location: string;
  /**
   * ETag of the uploaded object.
   */
  ETag: string;
  /**
   * Bucket to which the object was uploaded.
   */
  Bucket: string;
  /**
   * Key to which the object was uploaded.
   */
  Key: string;
}

export type UploadResponse = {
  fileUploadResponse: UploadResponseData[];
};

/**
 *
 * @param payload
 * @returns mutation
 * Mutation body takes files and fieldToUpdate (it is filepath field to update)
 */
export const useFileUpload = (payload: FileUploadParams) => {
  const { recordId, repo } = payload;
  const { mutate, isError, isLoading, data } = useHttpMutation<
    UploadResponse[],
    unknown,
    FormData
  >(`/upload-file/${recordId}/${repo}`, 'post');

  return {
    uploadFiles: mutate,
    isError,
    isLoading,
    data,
  };
};

export declare type FileUploadBody = {
  fieldToUpdate: string;
  files: FileList;
};

export const mutateUploadFile = (
  body: FileUploadBody,
  uploadFiles: UseMutateFunction<UploadResponse[], unknown, FormData>,
  callback: (res: UploadResponse[] | null, err?: unknown) => void
) => {
  const { fieldToUpdate, files } = body;
  const formData = new FormData();
  formData.set('fieldToUpdate', fieldToUpdate);
  convertFilesToFormData(files, formData);
  uploadFiles(formData, {
    onError: err => {
      console.error({ err }, 'Error uploading file');
      callback(null, err);
    },
    onSuccess: data => {
      callback(data);
    },
  });
};

export const convertFilesToFormData = (files: FileList, formData: FormData) => {
  const fileArr = Array.from(files);
  for (let f = 0; f < fileArr.length; f++) {
    formData.append('files', fileArr[f], fileArr[f].name);
  }
};

export interface DeleteObjectOutput {
  /**
   * Specifies whether the versioned object that was permanently deleted was (true) or was not (false) a delete marker.
   */
  DeleteMarker?: boolean;
  /**
   * Returns the version ID of the delete marker created as a result of the DELETE operation.
   */
  VersionId?: string;
  RequestCharged?: string;
}

export interface DeleteFilePayload {
  /**
   * Key to which the object was uploaded.
   */
  filePath: string;
  /**
   * Column name where we update filepath
   */
  fieldToUpdate: 'filepath';
}

export const useFileDelete = (payload: FileUploadParams) =>
  useHttpMutation<
    { msg: string; deleteFileData: DeleteObjectOutput },
    unknown,
    DeleteFilePayload
  >(`/delete-file/${payload.recordId}/${payload.repo}`, 'post');
