import { IUser } from 'app/shared/model/user.model';
import { IAdresse } from 'app/shared/model/adresse.model';

export interface IOuvrier {
  id?: number;
  telephone?: number;
  user?: IUser | null;
  adresse?: IAdresse | null;
}

export const defaultValue: Readonly<IOuvrier> = {};
