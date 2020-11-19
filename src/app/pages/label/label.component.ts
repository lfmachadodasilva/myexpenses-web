import { Component, OnInit } from '@angular/core';
import { LabelFullModel } from 'src/app/models/label.model';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {
  isLoading = false;
  objs: LabelFullModel[] = [];

  constructor(private labelService: LabelService) {}

  private reload(force: boolean) {
    this.isLoading = true;
    this.labelService
      .getAllFullAsync(force, 20, 10, 2020)
      .then((value) => {
        this.objs = value;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  async ngOnInit() {
    this.reload(false);
  }

  onClickReload() {
    this.reload(true);
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
