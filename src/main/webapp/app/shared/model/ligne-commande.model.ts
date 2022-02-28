import { ICommande } from 'app/shared/model/commande.model';
import { IProduit } from 'app/shared/model/produit.model';

export interface ILigneCommande {
  id?: number;
  quantite?: number | null;
  prix?: number | null;
  commande?: ICommande | null;
  produit?: IProduit | null;
}

export const defaultValue: Readonly<ILigneCommande> = {};
