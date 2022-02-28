export interface ICategorie {
  id?: number;
  nomCategorie?: string;
  description?: string | null;
}

export const defaultValue: Readonly<ICategorie> = {};
