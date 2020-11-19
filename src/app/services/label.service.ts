import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LabelFullModel, LabelModel } from '../models/label.model';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  private path = 'label';
  private pathFull = 'label/full';

  private objs: LabelModel[] = null;
  private objsFull: LabelFullModel[] = null;

  constructor(private http: HttpClient) {}

  async getAllAsync(forceRefresh: boolean = false): Promise<LabelModel[]> {
    if (!this.objs || forceRefresh) {
      this.objs = await this.http.get<LabelModel[]>(this.path).toPromise();
    }

    return this.objs;
  }

  async getAllFullAsync(
    forceRefresh: boolean = false,
    group: number, month: number, year: number
  ): Promise<LabelFullModel[]> {
    if (!this.objsFull || forceRefresh) {
      this.objsFull = await this.http
        .get<LabelFullModel[]>(
          this.pathFull,
          {
            params: {
              group: group.toString(),
              month: month.toString(),
              year: year.toString(),
            }
          }
        )
        .toPromise();
    }

    return this.objsFull;
  }
}
