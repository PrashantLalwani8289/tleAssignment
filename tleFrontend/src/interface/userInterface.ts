export interface IUserSignUpSchema  {
    full_name: string,
    email: string,
    password:string,
    confirm_password:string,
}
export interface IUserSignInSchema{
    email: string,
    password:string,
}

export interface IUserSignInSchema  {
    email: string,
    password:string,
}
export interface initialState {
    isAuthenticated: boolean;
    user:userData|null;
}

export interface userData{
    id: string;
    name: string;
    email: string;
    token: string;
}








