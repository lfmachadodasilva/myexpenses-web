import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  isLoading = false;
  isLoadingGroups = false;

  sub: Subscription;

  constructor(private searchService: SearchService) {
    // force to proccess
    this.searchService.searchObs.subscribe();
  }

  async ngOnInit() {}

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
