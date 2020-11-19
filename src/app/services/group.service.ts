import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GroupFullModel, GroupModel } from '../models/group.model';

const fakeApi = false;

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private path = 'group';
  private pathFull = 'group/full';

  private groupObs: Observable<GroupModel[]> = undefined;

  private objs: GroupModel[] = null;
  private objsFull: GroupFullModel[] = null;

  constructor(private http: HttpClient) {}

  getAll(forceRefresh: boolean = false): Observable<GroupModel[]> {
    if (!this.groupObs || forceRefresh) {
      console.log('create new group Observable');
      // if (fakeApi) {
      //   this.groupObs = new Observable((observer) => {
      //     setTimeout(() => {
      //       observer.next(groupsMockData);
      //       observer.complete();
      //     }, 1000);
      //   });
      // } else
      {
        this.groupObs = this.http.get<GroupModel[]>('group');
        // .pipe(
        //   tap(
        //     // Log the result or error
        //     (data) => console.log(data),
        //     (error) => console.error(error)
        //   )
        // );
      }
    } else {
      console.log('already exist group Observable');
    }

    return this.groupObs;
  }

  async getAllAsync(forceRefresh: boolean = false): Promise<GroupModel[]> {
    if (!this.objs || forceRefresh) {
      this.objs = await this.http.get<GroupModel[]>(this.path).toPromise();
    }

    return this.objs;
  }

  async getAllFullAsync(
    forceRefresh: boolean = false
  ): Promise<GroupFullModel[]> {
    if (!this.objsFull || forceRefresh) {
      this.objsFull = await this.http
        .get<GroupFullModel[]>(this.pathFull)
        .toPromise();
    }

    return this.objsFull;
  }

  // async getAll2(forceRefresh: boolean = false) {
  //   if (forceRefresh) {
  //     this.groupObs = new Observable((observer) => {
  //       setTimeout(() => {
  //         observer.next(groupsMockData);
  //         observer.complete();
  //       }, 1000);
  //     });

  //     this.groups = await this.groupObs.toPromise();
  //   }

  //   if (!this.groups) {
  //     this.groupObs = new Observable((observer) => {
  //       setTimeout(() => {
  //         observer.next(groupsMockData);
  //         observer.complete();
  //       }, 1000);
  //     });

  //     this.groups = await this.groupObs.toPromise();
  //   }

  //   console.log('return groups', this.groups);

  //   return this.groups;
  // }
}
