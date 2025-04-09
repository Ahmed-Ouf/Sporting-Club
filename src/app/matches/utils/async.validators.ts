import { MatchesApiService } from './matches-api.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";

export function codeValidator(api: MatchesApiService, id: string): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return api.isCodeExist(id, control.value).pipe(
            map(res => {
                return res === true ? { codeExist: true } : null;
            })
        );
    };
}