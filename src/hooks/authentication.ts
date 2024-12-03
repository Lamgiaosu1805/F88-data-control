// import { loginRequest, logoutSuccess, changeRememberMe, initApp } from '~/store/slices/authentication';
import { loginSuccess, logoutCMS } from "../store/slice/authentication";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginRequestApi } from "@api/authentication";
import { dataPostLoginType, inforUser } from "@utils/types/auth_type";
// import { dataPostLoginType } from "@utils/types";

const useAuthenticationStore = () => {
  const dispatch = useAppDispatch();
  const authenticationState = useAppSelector((state) => state.authentication);

  const dispatchLogin = async (
    payload: dataPostLoginType,
    onSuccess: (res: any) => void,
    onError: (res: any) => void
  ) => {
    try {
      const response = await loginRequestApi(payload);
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  };

  const dispatchLoginSuccess = (payload: inforUser) => {
    dispatch(loginSuccess(payload));
  };

  const dispatchLogOut = () => {
    dispatch(logoutCMS());
  };
  return {
    authenticationState,
    dispatchLogin,
    dispatchLoginSuccess,
    dispatchLogOut,
  };
};

export { useAuthenticationStore };
