import { IMatch } from './../../shared/models/match';
import { catchError, Observable, take } from 'rxjs';
import { HandleErrorService } from 'src/app/shared/services/handle-error.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchesApiService {

  url: string = environment.baseUrl + 'api/Matches'
  constructor(private http: HttpClient,
    private handleError: HandleErrorService) { }

  getMatches() {
    return this.http.get<IMatch[]>(this.url).pipe(take(1), catchError(this.handleError.logError));
  }
  addMatch(Match: IMatch): Observable<IMatch> {
    return this.http.post<IMatch>(this.url, Match).pipe(take(1), catchError(this.handleError.logError));
  }
  updateMatch(id: string, Match: IMatch): Observable<IMatch> {
    return this.http.put<IMatch>(`${this.url}/${id}`, Match).pipe(catchError(this.handleError.logError));
  }
  getMatch(id: string): Observable<IMatch> {
    return this.http.get<IMatch>(`${this.url}/${id}`).pipe(take(1), catchError(this.handleError.logError));

  }
  deleteMatch(id: string): Observable<IMatch> {
    return this.http.delete<IMatch>(`${this.url}/${id}`).pipe(take(1), catchError(this.handleError.logError));
  }
  isCodeExist(id: string, code: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/IsCodeExist/${id}/${code}`).pipe(take(1), catchError(this.handleError.logError));
  }


}
