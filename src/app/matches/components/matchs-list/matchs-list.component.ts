import { ClubsApiService } from './../../../clubs/utils/services/clubs-api.service';
import { IClub } from './../../../shared/models/club';
import { Router } from '@angular/router';
import { IMatch } from './../../../shared/models/match';
import { Component, OnInit } from '@angular/core';
import { MatchesApiService } from '../../utils/matches-api.service';
import { Observable, map, from } from 'rxjs';
import { ExcelService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-matchs-list',
  templateUrl: './matchs-list.component.html',
  styleUrls: ['./matchs-list.component.scss']
})
export class MatchsListComponent implements OnInit {

  matches$!: Observable<IMatch[]>;
  matches!: IMatch[];
  filteredMatches!: IMatch[];
  clubList$!: Observable<IClub[]>;
  selectedClub: IClub | null = null;
  seasons!: string[];
  selectedSeason: string | null = null;
  constructor(private matchApi: MatchesApiService,
    private clubApi: ClubsApiService,
    private router: Router,
    private excel: ExcelService
  ) { }

  ngOnInit(): void {
    this.matchApi.getMatches().subscribe(e => {
      this.matches = e;
      this.seasons = [...new Set(this.matches.map(e => e.season))];
      this.filteredMatches = e;
    });
    this.clubList$ = this.clubApi.getClubs();
    this.selectedClub = <IClub>{ name: 'All' };
  }
  goToEditPage(id: string) {
    this.router.navigate(["/match-create", id]);
  }
  onSelectChange() {
    if (!this.selectedClub) {
      this.filteredMatches = this.matches;
    }
    else if (this.selectedClub) {
      this.filteredMatches = this.matches.filter(e => { return e.firstClubId == this.selectedClub?.id || e.secondClubId == this.selectedClub?.id });
    }

  }
  onSelectSeasonChange() {
    if (!this.selectedSeason) {
      this.filteredMatches = this.matches;
    }
    else if (this.selectedSeason) {
      this.filteredMatches = this.matches.filter(e => { return e.season == this.selectedSeason });
    }

  }
  onExportToExcel() {
    this.excel.exportJsonToExcel(this.getArMatches(), 'المباريات');
  }
  getArMatches() {
    return this.filteredMatches.map((e, i) => {
      return {
        "#": ++i,
        "رقم المبارة": e.code,
        "الفريق الاول": e.firstClub.name,
        "اهداف الفريق الاول": e.firstClubGoals,
        "الفريق الثاني": e.secondClub.name,
        "اهداف الفريق الثاني": e.secondClubGoals,
        "الملعب": e.firstClub.stadium,
        "وقت المبارة": e.matchTime
      };
    })
  }
}
