import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { GroupModel } from '../models/group.model';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'my-app';

  isLoading = false;
  isLoadingGroups = false;

  groupsSubscription: Subscription;
  groups: GroupModel[] = [];

  constructor(private groupService: GroupService) {}

  async ngOnInit() {
    this.isLoading = true;

    // this.isLoadingGroups = true;
    // this.groupsSubscription = this.groupService.getAll().subscribe((res) => {
    //   this.groups = res;
    //   this.isLoadingGroups = false;

    //   console.log('loaded groups ', res);
    // });

    this.isLoadingGroups = true;
    // await this.groupService.getAll2(true);
    this.isLoadingGroups = false;

    // const runAsync = async () => {
    // const data = await this.groupService.getAll().toPromise();
    // console.log(data);
    // };
    // runAsync();
  }

  ngOnDestroy(): void {
    // this.groupsSubscription.unsubscribe();
  }
}
