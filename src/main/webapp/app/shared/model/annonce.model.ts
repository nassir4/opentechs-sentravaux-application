import dayjs from 'dayjs';
import { IOuvrier } from 'app/shared/model/ouvrier.model';
import { Disponiblite } from 'app/shared/model/enumerations/disponiblite.model';

export interface IAnnonce {
  id?: number;
  titre?: string;
  statut?: boolean | null;
  description?: string;
  disponibilite?: Disponiblite;
  imageEnAvantContentType?: string;
  imageEnAvant?: string;
  createdAt?: string | null;
  ouvrier?: IOuvrier | null;
}

export const defaultValue: Readonly<IAnnonce> = {
  statut: false,
};
