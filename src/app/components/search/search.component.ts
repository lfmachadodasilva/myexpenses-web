import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchModel } from 'src/app/models/search.model';
import { SearchService } from 'src/app/services/search.service';

import { GroupModel } from '../../models/group.model';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  sub: Subscription;
  searchData: SearchModel;
  groups: GroupModel[] = [];
  months: number[] = [];
  years: number[] = [];
  isLoading = false;
  panelOpenState = false;

  groupModel: GroupModel;
  group: string;
  month: string;
  year: string;

  constructor(private router: Router, private searchService: SearchService) {
    console.log('before sub');
    this.sub = this.searchService.searchObs.subscribe((data) => {
      // this.searchData = data;

      // this.groups = data.groups;
      // this.months = data.months;
      // this.years = data.years;

      // this.groupModel = data.groups.find((x) => x.id === data.group);
      // this.group = data.group.toString();
      // this.month = data.month.toString();
      // this.year = data.year.toString();

      // console.log('after sub', data);
      this.fill();
    });
  }

  ngOnInit() {
    console.log('ngOnInit', this.groups, this.searchService);

    this.fill();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSearch() {
    this.router.navigate([window.location.pathname], {
      queryParams: {
        group: this.group,
        month: this.month,
        year: this.year,
      },
    });
  }

  private fill() {
    this.groups = this.searchService.groups;
    this.months = this.searchService.months;
    this.years = this.searchService.years;

    if (this.searchService.selectedGroup) {
      this.groupModel = this.searchService.groups.find(
        (x) => x.id === this.searchService.selectedGroup.id
      );
      this.group = this.searchService.selectedGroup.id.toString();
    }

    this.month = this.searchService.selectedMonth.toString();
    this.year = this.searchService.selectedYear.toString();
  }
}
