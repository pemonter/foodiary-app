import * as FileSystem from 'expo-file-system';

import { httpClient } from '@/services/httpClient';

import { useMutation } from '@tanstack/react-query';

type CreateMealResponse = {
  mealId: string;
  uploadURL: string;
};

type CreateMealParams = {
  fileType: 'image/jpeg' | 'audio/m4a';
  onSuccess: (mealId: string) => void;
};

export function useCreateMeal({ fileType, onSuccess }: CreateMealParams) {
  const { mutateAsync: createMeal, isPending } = useMutation({
    mutationFn: async (uri: string) => {
      const { data } = await httpClient.post<CreateMealResponse>('/meals', {
        fileType,
      });

      const { mealId, uploadURL } = data;

      await FileSystem.uploadAsync(uploadURL, uri, {
        httpMethod: 'PUT',
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      });

      return { mealId };
    },
    onSuccess: ({ mealId }) => {
      onSuccess(mealId);
    },
  });

  return { createMeal, isLoading: isPending };
}
