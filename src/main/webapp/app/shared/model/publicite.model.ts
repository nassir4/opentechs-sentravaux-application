import { IAdmin } from 'app/shared/model/admin.model';

export interface IPublicite {
  id?: number;
  imageContentType?: string | null;
  image?: string | null;
  videoContentType?: string | null;
  video?: string | null;
  description?: string | null;
  statut?: boolean | null;
  admin?: IAdmin | null;
}

export const defaultValue: Readonly<IPublicite> = {
  statut: false,
};
