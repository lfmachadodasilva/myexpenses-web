export class LabelModel {
  id: number;
  name: string;
}

export interface LabelFullModel extends LabelModel {
  currValue: number;
  lastValue: number;
  avgValue: number;
}
