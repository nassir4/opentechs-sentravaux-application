import { IUser } from 'app/shared/model/user.model';

export interface IAdmin {
  id?: number;
  telephone?: number;
  user?: IUser | null;
}

export const defaultValue: Readonly<IAdmin> = {};
