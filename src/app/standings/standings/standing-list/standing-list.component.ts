import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IStandingDto } from 'src/app/shared/models/IStandingDto';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { StandingService } from '../utils/standing.service';

@Component({
  selector: 'app-standing-list',
  templateUrl: './standing-list.component.html',
  styleUrls: ['./standing-list.component.scss']
})
export class StandingListComponent implements OnInit {

  weakNumber: number = 0;
  maxWeakNumber: number = 0;
  standings$!: Observable<IStandingDto[]>;
  standings!: IStandingDto[];
  constructor(private api: StandingService, private excel: ExcelService) { }

  ngOnInit(): void {
    this.api.getLatestWeak().subscribe(e => {
      this.weakNumber = e;
      this.maxWeakNumber = e;
      this.api.getStandings(this.maxWeakNumber).subscribe(e => this.standings = e);
    });


  }

  goToPrev() {
    this.weakNumber = this.weakNumber - 1;
    this.api.getStandings(this.weakNumber).subscribe(e => this.standings = e);
  }
  goToNext() {
    this.weakNumber = this.weakNumber + 1;
    this.api.getStandings(this.weakNumber).subscribe(e => this.standings = e);
  }
  onExportToExcel() {
    this.excel.exportJsonToExcel(this.getArMatches(), 'ترتيب الفرق');
  }
  getArMatches() {
    return this.standings.map((e, i) => {
      return {
        "#": ++i,
        " النادي": e.clubName,
        " لعب": e.played,
        "  فاز": e.wins,
        " تعادل": e.draws,
        "  هزم": e.losses,
        "له": e.goals,
        " علية": e.goalsAgainst,
        " فرق الاهداف": e.goalsDiff,
        " النقاط": e.points
      };
    })
  }

}
