import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { GroupModel } from '../models/group.model';
import { SearchModel } from '../models/search.model';
import { ExpenseService } from './expense.service';
import { GroupService } from './group.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly searchObs: Observable<SearchModel>;
  isLoading = false;

  groups: GroupModel[] = [];
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: number[] = [];

  selectedGroup: GroupModel;
  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private expenseService: ExpenseService
  ) {
    this.searchObs = new Observable((obs) => {
      this.isLoading = true;

      const sub = this.routerEventsSubscribe(obs);

      // if have error
      // observer.error(error);

      return {
        unsubscribe() {
          // todo
          sub.unsubscribe();
        },
      };
    });

    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.load(false).then((data) => {
    //       this.activatedRoute.queryParamMap.subscribe((query) => {
    //         const group = query.get('group');
    //         const month = query.get('month');
    //         const year = query.get('year');

    //         const groups = data[0] as GroupModel[];
    //         const lastGroup = localStorage.getItem('group') as string;
    //         if (group && groups.some((x) => x.id === +group)) {
    //           this.selectedGroup = groups.find(
    //             (x) => x.id === +group
    //           ) as GroupModel;
    //         } else if (lastGroup && groups.some((x) => x.id === +lastGroup)) {
    //           this.selectedGroup = groups.find(
    //             (x) => x.id === +lastGroup
    //           ) as GroupModel;
    //         } else if (groups) {
    //           this.selectedGroup = groups[0];
    //         } else {
    //           // groupResults = {} as Partial<GroupModel>;
    //           // show error - does not have groups loaded
    //           // setLoading(false);
    //           // return undefined;
    //         }
    //         localStorage.setItem('group', this.selectedGroup.toString());

    //         const lastMonth = localStorage.getItem('month') as string;
    //         if (month && +month >= 1 && +month <= 12) {
    //           this.selectedMonth = +month;
    //         } else if (lastMonth && +lastMonth >= 1 && +lastMonth <= 12) {
    //           this.selectedMonth = +lastMonth;
    //         }
    //         localStorage.setItem('month', this.selectedMonth.toString());

    //         const years = data[0] as number[];
    //         // validate month and select
    //         const lastYear = localStorage.getItem('year') as string;
    //         if (year && years.some((x) => x === +year)) {
    //           this.selectedYear = +year;
    //         } else if (lastYear && years.some((x) => x === +lastYear)) {
    //           this.selectedYear = +lastYear;
    //         }
    //         localStorage.setItem('year', this.selectedYear.toString());

    //         // console.log(
    //         //   event,
    //         //   group,
    //         //   this.selectedGroup,
    //         //   month,
    //         //   this.selectedMonth,
    //         //   year,
    //         //   this.selectedYear,
    //         //   data,
    //         //   this.activatedRoute,
    //         //   window.location
    //         // );

    //         this.router.navigate([window.location.pathname], {
    //           queryParams: {
    //             group: this.selectedGroup.id,
    //             month: this.selectedMonth,
    //             year: this.selectedYear,
    //           },
    //         });
    //       });
    //       // this.activatedRoute.queryParamMap.toPromise().then((query) => {
    //       // console.log(obs, window, this.activatedRoute);
    //       // });
    //     });
    //     // const runAsync = async () => {
    //     //   await this.load(false);

    //     //   const queryParamMap = await this.activatedRoute.queryParamMap.toPromise();

    //     // };
    //     // runAsync();
    //     // Hide loading indicator
    //   }
    // });
  }

  async ngOnInit() {}

  ngOnDestroy() {}

  async loadGroups(force: boolean) {
    return await this.groupService.getAllAsync(force);
  }

  async loadYears(force: boolean) {
    return await this.expenseService.getYearsAsync(force);
  }

  async load(force: boolean) {
    let groups: GroupModel[] = [];
    let years: number[] = [];

    this.groups = await this.loadGroups(force);
    this.years = await this.loadYears(force);

    return [groups, years];
  }

  private routerEventsSubscribe(obs: Subscriber<SearchModel>) {
    let sub: Subscription;
    return this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.load(false)
            .then((data) => {
              sub = this.processQueryParams(obs);
            })
            .catch(() => {
              // TODO
              console.log('ERROR');
              this.isLoading = false;
            });
        }
      },
      () => {
        if (sub) {
          // sub.unsubscribe();
        }
      }
    );
  }

  private processQueryParams(obs: Subscriber<SearchModel>) {
    return this.activatedRoute.queryParamMap.subscribe((query) => {
      const group = query.get('group');
      const month = query.get('month');
      const year = query.get('year');

      this.processGroup(group, this.groups);
      this.processMonth(month);
      this.processYear(year, this.years);

      this.router
        .navigate([window.location.pathname], {
          queryParams: {
            group: this.selectedGroup.id,
            month: this.selectedMonth,
            year: this.selectedYear,
          },
        })
        .then(() => {
          obs.next({
            group: this.selectedGroup.id,
            groups: this.groups,
            month: this.selectedMonth,
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            year: this.selectedYear,
            years: this.years.length === 0 ? [this.selectedYear] : this.years,
          });
          console.log('push: ', {
            group: this.selectedGroup.id,
            groups: this.groups,
            month: this.selectedMonth,
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            year: this.selectedYear,
            years: this.years.length === 0 ? [this.selectedYear] : this.years,
          });
          // obs.complete();
          this.isLoading = false;
        });
    });
  }

  private processGroup(group: string, groups: GroupModel[]) {
    const lastGroup = localStorage.getItem('group');

    if (group && groups.some((x) => x.id === +group)) {
      this.selectedGroup = groups.find((x) => x.id === +group) as GroupModel;
    } else if (lastGroup && groups.some((x) => x.id === +lastGroup)) {
      this.selectedGroup = groups.find(
        (x) => x.id === +lastGroup
      ) as GroupModel;
    } else if (groups) {
      this.selectedGroup = groups[0];
    } else {
      // groupResults = {} as Partial<GroupModel>;
      // show error - does not have groups loaded
      // setLoading(false);
      // return undefined;
    }
    console.log(lastGroup, group, groups, this.selectedGroup);
    if (this.selectedGroup) {
      localStorage.setItem('group', this.selectedGroup.id.toString());
    }
  }

  private processMonth(month: string) {
    const lastMonth = localStorage.getItem('month') as string;
    if (month && +month >= 1 && +month <= 12) {
      this.selectedMonth = +month;
    } else if (lastMonth && +lastMonth >= 1 && +lastMonth <= 12) {
      this.selectedMonth = +lastMonth;
    }
    localStorage.setItem('month', this.selectedMonth.toString());
  }

  private processYear(year: string, years: number[]) {
    const lastYear = localStorage.getItem('year') as string;
    if (year && years.some((x) => x === +year)) {
      this.selectedYear = +year;
    } else if (lastYear && years.some((x) => x === +lastYear)) {
      this.selectedYear = +lastYear;
    }
    localStorage.setItem('year', this.selectedYear.toString());
  }
}
