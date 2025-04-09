import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsListComponent } from './components/clubs-list/clubs-list.component';
import { ClubsCreateComponent } from './components/clubs-create/clubs-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ClubsListComponent,
    ClubsCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class ClubsModule { }
