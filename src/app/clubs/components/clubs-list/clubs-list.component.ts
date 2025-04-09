import { IClub } from 'src/app/shared/models/club';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClubsApiService } from '../../utils/services/clubs-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.scss'],
})
export class ClubsListComponent implements OnInit {
goToNext() {
this.pageNumber++;
this.loadClubs();

}
goToPrev() {
  this.pageNumber--;
  this.loadClubs();
}
  clubs$!: Observable<IClub[]>;
  clubs!: Array<IClub>;
  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;
  constructor(
    private api: ClubsApiService,
    private router: Router,
    private excel: ExcelService
  ) {}

  ngOnInit(): void {
    this.loadClubs();
  }
  loadClubs() {
    this.api.getClubsByPages(this.pageNumber, this.pageSize).subscribe((result) => {
      this.clubs = result.clubs;
      this.totalCount = result.totalCount;
    });
  }
  goToEditPage(id: string) {
    this.router.navigate(['/club-create', id]);
  }

  onExportToExcel() {
    this.excel.exportJsonToExcel(this.getArMatches(), 'الاندية');
  }
  getArMatches() {
    return this.clubs.map((e, i) => {
      return {
        '#': ++i,
        'رقم النادي': e.code,
        'النادي ': e.name,
        ' الملعب ': e.stadium,
        ' الزي الرسمي': e.defaultColor,
        '  الزي الاحتياطي': e.otherColor,
      };
    });
  }
}
