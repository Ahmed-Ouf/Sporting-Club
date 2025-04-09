import { IMatch } from './../../../shared/models/match';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchesApiService } from '../../utils/matches-api.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IClub } from 'src/app/shared/models/club';
import { ClubsApiService } from 'src/app/clubs/utils/services/clubs-api.service';
import { formatDate } from '@angular/common';
import { codeValidator } from '../../utils/async.validators';

@Component({
  selector: 'app-matchs-create',
  templateUrl: './matchs-create.component.html',
  styleUrls: ['./matchs-create.component.scss']
})
export class MatchsCreateComponent implements OnInit {

  matchForm!: FormGroup;
  currentMatchId: string = '00000000-0000-0000-0000-000000000000';
  matchModel$!: Observable<IMatch>;
  firstClubList$!: Observable<IClub[]>;
  secondClubList$!: Observable<IClub[]>;
  image!: string | ArrayBuffer | null;

  constructor(private fb: FormBuilder,
    private api: MatchesApiService,
    private clubsapi: ClubsApiService,
    private route: ActivatedRoute) {

    this.matchForm = fb.group({
      id: '',
      code: ['',
        {
          validators: [Validators.required],
          asyncValidators: [codeValidator(this.api, this.currentMatchId)],
          updateOn: 'blur'
        }
      ],
      weakNumber: ['', Validators.required],
      firstClubGoals: [''],
      secondClubGoals: [''],
      matchTime: ['', Validators.required],
      date: [formatDate(Date.now(), "yyyy-MM-dd", "en"), Validators.required],
      firstClubId: ['', Validators.required],
      secondClubId: ['', Validators.required],

    })
  }
  ngOnInit(): void {
    this.firstClubList$ = this.clubsapi.getClubs();
    this.secondClubList$ = this.clubsapi.getClubs();
    const matchId = this.route.snapshot.paramMap.get('id');
    if (matchId) {
      this.currentMatchId = matchId;
      this.setAsyncValidator(matchId)
      this.matchModel$ = this.api.getMatch(matchId);
      this.matchModel$.subscribe(e => this.onUpdate(e));
    }
  }
  isRequired(filed: string) {
    let control = this.matchForm.get(filed);
    return control?.touched && control?.invalid;
  }

  isRequiredByType(filed: string, errorType: string) {
    let control = this.matchForm.get(filed);
    return control?.touched && control?.hasError(errorType);
  }
  onMatchFormSubmit() {
    console.log(this.matchForm.value);
    let model = this.matchForm.value;
    if (model.firstClubId == model.secondClubId) {
      alert("لا يجوز اختيار نفس الفريق");
      return;
    }
    if (this.matchForm.value.id) {
      let res = this.api.updateMatch(this.matchForm.value.id, this.matchForm.value);
      res.subscribe((r: any) => alert("تم التعديل بنجاح"));

    } else {
      delete model.id;
      if (model.firstClubId == model.secondClubId) {
        alert("لا يجوز اختيار نفس الفريق");
        return;
      } // model.matchTime += ':00';
      let res = this.api.addMatch(model);
      res.subscribe((r: any) => alert("تمت الاضافة بنجاح"));
    }

    //this.onReset();
  }

  onReset() {
    this.matchForm.reset()
  }
  onUpdate(model: IMatch) {
    this.matchForm.patchValue(
      {
        ...model, date: formatDate(model.date ?? Date.now(), "yyyy-MM-dd", "en")
      }
    )

  }
  onDelete() {
    if (this.matchForm.value.id) {
      let res = this.api.deleteMatch(this.matchForm.value.id);
      res.subscribe((r: any) => alert("تم الحذف بنجاح"));
      this.onReset();
    }
  }
  setAsyncValidator(matchId: string) {
    this.matchForm.get('code')?.setAsyncValidators([codeValidator(this.api, matchId)])
  }
}
