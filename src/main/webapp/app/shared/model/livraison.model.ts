import dayjs from 'dayjs';
import { ICommande } from 'app/shared/model/commande.model';

export interface ILivraison {
  id?: number;
  quartier?: string;
  dateLivraison?: string | null;
  commande?: ICommande | null;
}

export const defaultValue: Readonly<ILivraison> = {};
