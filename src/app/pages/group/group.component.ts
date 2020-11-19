import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { getFirstDisplayName, UserModel } from 'src/app/models/user.model';

import { groupsMockData } from '../../mockData/group.mockData';
import { GroupFullModel, GroupModel } from '../../models/group.model';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  groupsObs: Observable<GroupModel[]>;
  groupsSub: Subscription;
  groups: GroupFullModel[] = [];
  isLoading = false;

  constructor(private groupService: GroupService) {}

  private reload(force: boolean) {
    this.isLoading = false;
    this.groupService.getAllFullAsync(force).then((value) => {
      this.groups = value;
      this.isLoading = false;
    });
  }

  async ngOnInit() {
    this.reload(false);
  }

  onClickReload() {
    this.reload(false);
  }

  onEdit(obj: GroupFullModel) {
    console.log('edit: ', obj);
  }

  onDuplicate(obj: GroupFullModel) {
    console.log('duplicate:', obj);
  }

  onDelete(obj: GroupFullModel) {
    console.log('delete: ', obj);
  }

  getDisplayName(user: UserModel) {
    return getFirstDisplayName(user);
  }
}
