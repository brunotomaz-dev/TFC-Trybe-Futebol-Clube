export interface IAuthUser {
  email: string,
  password: string,
}

export interface IUser extends IAuthUser {
  id: number,
  username: string,
  role: string,
}

export interface IUserToken {
  id: number,
  username: string,
  role: string,
  email: string,
}
