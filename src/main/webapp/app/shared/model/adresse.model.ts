export interface IAdresse {
  id?: number;
  region?: string;
  departement?: string;
  commune?: string;
}

export const defaultValue: Readonly<IAdresse> = {};
