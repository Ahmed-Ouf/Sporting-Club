import { ClubsCreateComponent } from './clubs/components/clubs-create/clubs-create.component';
import { ClubsListComponent } from './clubs/components/clubs-list/clubs-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchsListComponent } from './matches/components/matchs-list/matchs-list.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MatchsCreateComponent } from './matches/components/matchs-create/matchs-create.component';
import { StandingListComponent } from './standings/standings/standing-list/standing-list.component';

const routes: Routes = [
  { path: "match-list", component: MatchsListComponent },
  { path: "match-create", component: MatchsCreateComponent },
  { path: "match-create/:id", component: MatchsCreateComponent },
  { path: "club-list", component: ClubsListComponent },
  { path: "club-create", component: ClubsCreateComponent },
  { path: "club-create/:id", component: ClubsCreateComponent },
  { path: "standings-list", component: StandingListComponent },

  { path: "", component: MatchsListComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
