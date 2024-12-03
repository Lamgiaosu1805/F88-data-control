export interface inforUser {
    accessToken: string;
    createdAt: string;
    isDelete: boolean;
    isFirstPass: true;
    roleId: number;
    updatedAt: string;
    username: string;
    __v: 0;
    _id: string;
  }
  

  export interface authenticationType {
    user?: inforUser | null;
  }

  export interface dataPostLoginType {
    username: string;
    password: string;
    isLoginAdmin: boolean;
  }