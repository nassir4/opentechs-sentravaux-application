import dayjs from 'dayjs';
import { IClient } from 'app/shared/model/client.model';

export interface IDevis {
  id?: number;
  dateDevis?: string | null;
  manoeuvre?: number | null;
  sommeTotal?: number | null;
  ouvrier?: IDevis | null;
  client?: IClient | null;
}

export const defaultValue: Readonly<IDevis> = {};
