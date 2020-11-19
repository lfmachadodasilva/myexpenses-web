import { LabelModel } from './label.model';

export enum ExpenseType {
  Incoming = 0,
  Outcoming
}

abstract class ExpenseModelBase {
  id: number;
  name: string;

  type: ExpenseType;
  value: number;

  date: Date;
  comments: string;
}

export class ExpenseModel extends ExpenseModelBase {
  labelId: number;
}

export class ExpenseFullModel extends ExpenseModelBase {
  label: LabelModel;
}
