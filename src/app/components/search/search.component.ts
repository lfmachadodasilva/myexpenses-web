import { Component, OnInit } from '@angular/core';

import { GroupModel } from '../../models/group.model';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  groups: GroupModel[] = [];
  isLoadingGroups = false;
  panelOpenState = false;

  constructor(private groupService: GroupService) {}

  async ngOnInit() {
    this.isLoadingGroups = true;
    this.groupService
      .getAllAsync(false)
      .then((value) => {
        this.groups = value;
      })
      .finally(() => {
        this.isLoadingGroups = false;
      });
  }

  onSearch() {}
}
