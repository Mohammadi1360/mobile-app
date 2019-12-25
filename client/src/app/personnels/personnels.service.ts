import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Personnel} from '../shared/model/personnel.model';

@Injectable({
    providedIn: 'root'
})
export class PersonnelsService {
    private _personnels = new BehaviorSubject<Personnel[]>([]);

    constructor(private authService: AuthService, private http: HttpClient) {
    }

    get personnels() {
        return this._personnels.asObservable();
    }

    savePersonnel(personnel: Personnel) {
        return this.authService.token.pipe(
            switchMap(token => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    })
                };

                if (personnel.id === 0) {
                    return this.http.post<any>(
                        `/api/private/personnel`,
                        personnel,
                        httpOptions
                    );
                } else {
                    return this.http.put<any>(
                        `/api/private/personnel/${personnel.id}`,
                        personnel,
                        httpOptions
                    );
                }
            }));
    }

    getPersonnel(id: string) {
        return this.authService.token.pipe(
            switchMap(token => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    })
                };
                return this.http.get<any>(
                    `/api/private/personnel/${id}`,
                    httpOptions
                );
            }));
    }

    deletePersonnel(personnelId: string) {
        console.log('1 call delete api');
        return this.authService.token.pipe(
            switchMap(token => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    })
                };
                console.log('call delete api');
                return this.http.delete(
                    `/api/private/personnel/${personnelId}`,
                    httpOptions
                );
            }));
    }


    fetchPersonnelList() {
        return this.authService.token.pipe(
            switchMap(token => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    })
                };
                return this.http.get<Personnel[]>(
                    `/api/private/personnel`,
                    httpOptions
                );
            }),
            tap(personnels => {
                this._personnels.next(personnels);
            })
        );
    }

}
