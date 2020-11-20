import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LabelFullModel } from 'src/app/models/label.model';
import { LabelService } from 'src/app/services/label.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit, OnDestroy {
  isLoading = false;
  objs: LabelFullModel[] = [];
  sub: Subscription;

  group: number;
  month: number;
  year: number;

  constructor(
    private router: Router,
    private labelService: LabelService,
    private searchService: SearchService
  ) {
    this.sub = this.searchService.searchObs.subscribe((data) => {
      this.group = data.group;
      this.month = data.month;
      this.year = data.year;
      this.reload(true);
    });
  }

  private reload(force: boolean) {
    this.isLoading = true;
    this.labelService
      .getAllFullAsync(force, this.group, this.month, this.year)
      .then((value) => {
        this.objs = value;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  async ngOnInit() {}

  ngOnDestroy() {}

  onClickReload() {
    this.reload(true);
    // this.router.navigate(['label'], {
    //   queryParams: { group: 20, month: 10, year: 2020 },
    // });
    // console.log(
    //   this.searchService.selectedGroup,
    //   this.searchService.selectedMonth,
    //   this.searchService.selectedYear
    // );
  }

  onEdit(obj: LabelFullModel) {
    console.log('edit: ', obj);
  }

  onDuplicate(obj: LabelFullModel) {
    console.log('duplicate:', obj);
  }

  onDelete(obj: LabelFullModel) {
    console.log('delete: ', obj);
  }
}
