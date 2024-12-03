import { setLoading } from "@store/slice/loading";

const SuccessStatusList = [200, 203, 204];

export const callApiCommon = async (
  api: any,
  payload: any,
  isLoading: boolean,
  onSuccess?: (res: any) => void,
  onError?: (err: any) => void
) => {
  if (isLoading) {
    try {
      setLoading(true);
      const response = await api(payload);
      setLoading(false);
      if (SuccessStatusList.includes(response?.status) || response.status) {
        onSuccess && onSuccess(response);
      } else {
        onError && onError(response);
      }
    } catch (error) {
      setLoading(false);
      onError && onError(error);
    }
  } else {
    try {
      const response = await api(payload);
      if (SuccessStatusList.includes(response?.status)) {
        onSuccess && onSuccess(response);
      } else {
        onError && onError(response);
      }
    } catch (error) {
      setLoading(false);
      onError && onError(error);
    }
  }
};
