import { Component, OnInit } from '@angular/core';
import { ExpenseFullModel, ExpenseType } from 'src/app/models/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
  isLoading = false;
  objsIncoming: ExpenseFullModel[] = [];
  objsOutcoming: ExpenseFullModel[] = [];

  totalIcoming: number;
  totalOutcoming: number;
  totalLeft: number;
  totalLeftPerc: number;

  constructor(private service: ExpenseService) {}

  private reload(force: boolean) {
    this.isLoading = true;
    this.service.getAllFullAsync(force, 20, 10, 2020).then((value) => {
      this.objsIncoming = value.filter((x) => x.type === ExpenseType.Incoming);
      this.objsOutcoming = value.filter(
        (x) => x.type === ExpenseType.Outcoming
      );

      this.totalIcoming = this.objsIncoming.reduce(
        (sum, current) => sum + current.value,
        0
      );
      this.totalOutcoming = this.objsOutcoming.reduce(
        (sum, current) => sum + current.value,
        0
      );
      this.totalLeft = this.totalIcoming - this.totalOutcoming;

      this.totalLeftPerc =
        this.totalIcoming === 0 ? 0 : this.totalLeft / this.totalIcoming;

      this.isLoading = false;
    });
  }

  async ngOnInit() {
    this.reload(false);
  }

  onClickReload() {
    this.reload(true);
  }

  onEdit(obj: ExpenseFullModel) {
    console.log('edit: ', obj);
  }

  onDuplicate(obj: ExpenseFullModel) {
    console.log('duplicate:', obj);
  }

  onDelete(obj: ExpenseFullModel) {
    console.log('delete: ', obj);
  }
}
