import dayjs from 'dayjs';
import { IClient } from 'app/shared/model/client.model';
import { IOuvrier } from 'app/shared/model/ouvrier.model';

export interface ICommande {
  id?: number;
  quantiteTotal?: number | null;
  prixTotal?: number | null;
  createdAt?: string | null;
  client?: IClient | null;
  ouvrier?: IOuvrier | null;
}

export const defaultValue: Readonly<ICommande> = {};
