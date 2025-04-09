import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchsListComponent } from './components/matchs-list/matchs-list.component';
import { MatchsCreateComponent } from './components/matchs-create/matchs-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MatchsListComponent,
    MatchsCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    MatchsListComponent
  ]
})
export class MatchesModule { }
