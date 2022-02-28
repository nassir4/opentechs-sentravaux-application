import { IOuvrier } from 'app/shared/model/ouvrier.model';
import { IClient } from 'app/shared/model/client.model';
import { IMedia } from 'app/shared/model/media.model';

export interface IMessage {
  id?: number;
  message?: string | null;
  ouvrier?: IOuvrier | null;
  client?: IClient | null;
  media?: IMedia | null;
}

export const defaultValue: Readonly<IMessage> = {};
