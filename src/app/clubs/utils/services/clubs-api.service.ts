import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, take } from 'rxjs';
import { IClub } from 'src/app/shared/models/club';
import { IPageResult } from 'src/app/shared/models/PageResult';
import { HandleErrorService } from 'src/app/shared/services/handle-error.service';
import { environment } from 'src/environments/environment';



const headers: HttpHeaders = new HttpHeaders();
headers.set('Content-Type', 'application/x-www-form-urlencoded');

@Injectable({
  providedIn: 'root'
})
export class ClubsApiService {

  url: string = environment.baseUrl + 'api/Clubs'
  constructor(private http: HttpClient,
    private handleError: HandleErrorService) { }

  getClubs() {
    return this.http.get<IClub[]>(this.url).pipe(take(1), catchError(this.handleError.logError));
  }
  getClubsByPages(pageNumber: number, pageSize: number): Observable<{ clubs: IClub[]; totalCount: number }> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
  
    return this.http.get<IPageResult<IClub>>(this.url+'/pages', { params, observe: 'response' }).pipe(
      take(1),
      map(response => {
        debugger;
        return { clubs: response.body?.items || [],totalCount: response.body?.totalCount|| 0};
      }),
      catchError(this.handleError.logError)
    );
  }
  addClub(club: IClub): Observable<IClub> {
    return this.http.post<IClub>(this.url, club, { headers: headers }).pipe(take(1), catchError(this.handleError.logError));
  }
  updateClub(id: string, club: IClub): Observable<IClub> {
    return this.http.put<IClub>(`${this.url}/${id}`, club, { headers: headers }).pipe(catchError(this.handleError.logError));
  }
  getClub(id: string): Observable<IClub> {
    return this.http.get<IClub>(`${this.url}/${id}`).pipe(take(1), catchError(this.handleError.logError));

  }
  deleteClub(id: string): Observable<IClub> {
    return this.http.delete<IClub>(`${this.url}/${id}`).pipe(take(1), catchError(this.handleError.logError));

  }
  isCodeExist(id: string, code: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/IsCodeExist/${id}/${code}`).pipe(take(2), catchError(this.handleError.logError));
  }

}
