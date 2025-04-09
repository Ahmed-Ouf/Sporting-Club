import { catchError, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from 'src/app/shared/services/handle-error.service';
import { IStandingDto } from 'src/app/shared/models/IStandingDto';

@Injectable({
  providedIn: 'root'
})
export class StandingService {
  url: string = environment.baseUrl + 'api/Standings'
  constructor(private http: HttpClient,
    private handleError: HandleErrorService) { }
  getStandings(weakNumber: number) {
    return this.http.get<IStandingDto[]>(`${this.url}/${weakNumber}`).pipe(take(1), catchError(this.handleError.logError));
  }
  getLatestWeak() {
    return this.http.get<number>(`${this.url}/latest-weaknumber`).pipe(take(1), catchError(this.handleError.logError));
  }
}
