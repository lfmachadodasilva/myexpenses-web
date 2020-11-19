import { UserModel } from './user.model';

export interface GroupModel {
  id: number;
  name: string;
}

export interface GroupFullModel extends GroupModel {
  users: UserModel[];
}
