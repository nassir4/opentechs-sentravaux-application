import { IOuvrier } from 'app/shared/model/ouvrier.model';

export interface IMetier {
  id?: number;
  nom?: string;
  description?: string | null;
  ouvrier?: IOuvrier | null;
}

export const defaultValue: Readonly<IMetier> = {};
