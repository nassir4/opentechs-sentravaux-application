import { IAnnonce } from 'app/shared/model/annonce.model';

export interface IMedia {
  id?: number;
  imageContentType?: string | null;
  image?: string | null;
  videoContentType?: string | null;
  video?: string | null;
  annonce?: IAnnonce | null;
}

export const defaultValue: Readonly<IMedia> = {};
