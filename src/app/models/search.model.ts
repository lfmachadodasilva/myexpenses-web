import { GroupModel } from './group.model';

export class SearchModel {
  group: number;
  groups: GroupModel[];

  month: number;
  months: number[];

  year: number;
  years: number[];
}
