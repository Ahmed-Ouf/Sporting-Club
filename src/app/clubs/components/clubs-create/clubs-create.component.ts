import { Observable } from 'rxjs/internal/Observable';
import { ClubsApiService } from './../../utils/services/clubs-api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IClub } from './../../../shared/models/club';
import { codeValidator } from '../../utils/services/async.validators';

@Component({
  selector: 'app-clubs-create',
  templateUrl: './clubs-create.component.html',
  styleUrls: ['./clubs-create.component.scss']
})
export class ClubsCreateComponent implements OnInit {
  currentClubId: string = '00000000-0000-0000-0000-000000000000';
  clubForm!: FormGroup;
  clubModel$!: Observable<IClub>;
  image!: string | ArrayBuffer | null;

  constructor(private fb: FormBuilder,
    private api: ClubsApiService,
    private route: ActivatedRoute) {

    this.clubForm = fb.group({
      id: '',
      code: ['',
        {
          validators: [Validators.required],
          asyncValidators: [codeValidator(this.api, this.currentClubId)],
          updateOn: 'blur'
        }
      ],
      name: ['', Validators.required],
      logo: ['', Validators.required],
      stadium: ['', Validators.required],
      defaultColor: ['', Validators.required],
      otherColor: ['', Validators.required],
      imagefile: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    const clubId = this.route.snapshot.paramMap.get('id');
    if (clubId) {
      this.currentClubId = clubId;
      this.setAsyncValidator(clubId);
      this.clubModel$ = this.api.getClub(clubId);
      this.clubModel$.subscribe(e => this.onUpdate(e));
    }
  }
  isRequired(filed: string) {
    let control = this.clubForm.get(filed);
    return control?.touched && control?.invalid;
  }
  isRequiredByType(filed: string, errorType: string) {
    let control = this.clubForm.get(filed);
    return control?.touched && control?.hasError(errorType);
  }
  onClubFormSubmit() {
    console.log(this.clubForm.value);
    let model = this.clubForm.value;
    delete model.imagefile;
    if (this.clubForm.value.id) {
      let res = this.api.updateClub(this.clubForm.value.id, this.clubForm.value);
      res.subscribe((r: any) => alert("تم التعديل بنجاح"));

    } else {
      delete model.id;
      let res = this.api.addClub(model);
      res.subscribe((r: any) => alert("تمت الاضافة بنجاح"));
    }

    this.onReset();
  }
  upload(files: FileList | null) {
    const file = files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result;
        this.clubForm.patchValue({
          logo: reader.result
        })

        console.log(this.clubForm.value)
      };

    } else {
      this.image = '';
    }
    console.log(files);
  }
  onReset() {
    this.clubForm.reset()
  }
  onUpdate(model: IClub) {
    this.clubForm.patchValue(
      {
        ...model
      }
    )
  }
  onDelete() {
    if (this.clubForm.value.id) {
      let res = this.api.deleteClub(this.clubForm.value.id);
      res.subscribe((r: any) => alert("تم الحذف بنجاح"));
      this.onReset();
    }
  }
  setAsyncValidator(clubId: string) {
    this.clubForm.get('code')?.setAsyncValidators([codeValidator(this.api, clubId)])
  }

}


