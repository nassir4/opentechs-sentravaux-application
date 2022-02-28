import dayjs from 'dayjs';
import { ICategorie } from 'app/shared/model/categorie.model';

export interface IProduit {
  id?: number;
  nom?: string;
  quantite?: number;
  prix?: number;
  photoContentType?: string;
  photo?: string;
  createdAt?: string | null;
  categorie?: ICategorie | null;
}

export const defaultValue: Readonly<IProduit> = {};
