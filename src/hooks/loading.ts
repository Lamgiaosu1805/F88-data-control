import { setLoading } from "../store/slice/loading";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const loadingStore = () => {
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector((state) => state.loading.loading);

  const dispatchLoading = (state: boolean) => {
    dispatch(setLoading(state));
  };

  return {
    loadingState,
    dispatchLoading,
  };
};

export { loadingStore };
