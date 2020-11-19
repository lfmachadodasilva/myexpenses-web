import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ExpenseFullModel, ExpenseModel } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private path = 'expense';
  private pathFull = 'expense/full';

  private objs: ExpenseModel[] = null;
  private objsFull: ExpenseFullModel[] = null;

  constructor(private http: HttpClient) {}

  async getAllAsync(forceRefresh: boolean = false): Promise<ExpenseModel[]> {
    if (!this.objs || forceRefresh) {
      this.objs = await this.http.get<ExpenseModel[]>(this.path).toPromise();
    }

    return this.objs;
  }

  async getAllFullAsync(
    forceRefresh: boolean = false,
    group: number,
    month: number,
    year: number
  ): Promise<ExpenseFullModel[]> {
    if (!this.objsFull || forceRefresh) {
      this.objsFull = await this.http
        .get<ExpenseFullModel[]>(this.pathFull, {
          params: {
            group: group.toString(),
            month: month.toString(),
            year: year.toString(),
          },
        })
        .toPromise();
    }

    return this.objsFull;
  }
}
