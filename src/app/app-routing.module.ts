import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

import { ExpenseComponent } from './pages/expense/expense.component';
import { GroupComponent } from './pages/group/group.component';
import { LabelComponent } from './pages/label/label.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['/']);

const defaultAuthRoute = {
  canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToHome },
};

const routes: Routes = [
  { path: 'group', component: GroupComponent, ...defaultAuthRoute },
  { path: 'label', component: LabelComponent, ...defaultAuthRoute },
  { path: 'expense', component: ExpenseComponent, ...defaultAuthRoute },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
