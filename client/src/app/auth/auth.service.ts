import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, from} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Plugins} from '@capacitor/core';
import {User} from '../shared/model/user.model';

export interface AuthResponseData {
    id: string;
    firstName: string;
    lastName: string;
    mobileNo: string;
    email: string;
    enable: boolean;
    auth: boolean;
    accessToken: string;
    expiresIn: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService implements OnDestroy {
    private _user = new BehaviorSubject<User>(null);
    private activeLogoutTimer: any;

    get userIsAuthenticated() {
        return this._user.asObservable().pipe(
            map(user => {
                if (user) {
                    return !!user.token;
                } else {
                    return false;
                }
            })
        );
    }

    get userId() {
        return this._user.asObservable().pipe(
            map(user => {
                if (user) {
                    return user.id;
                } else {
                    return null;
                }
            })
        );
    }

    get token() {
        return this._user.asObservable().pipe(
            map(user => {
                if (user) {
                    return user.token;
                } else {
                    return null;
                }
            })
        );
    }

    constructor(private http: HttpClient) {
    }

    autoLogin() {
        return from(Plugins.Storage.get({key: 'authData'})).pipe(
            map(storedData => {
                if (!storedData || !storedData.value) {
                    return null;
                }
                const parsedData = JSON.parse(storedData.value) as {
                    id: string,
                    firstName: string,
                    lastName: string,
                    mobileNo: string,
                    email: string,
                    enable: boolean,
                    accessToken: string,
                    tokenExpirationDate: string,
                };
                const expirationTime = new Date(parsedData.tokenExpirationDate);
                if (expirationTime <= new Date()) {
                    return null;
                }
                const user = new User(
                    parsedData.id,
                    parsedData.firstName,
                    parsedData.lastName,
                    parsedData.mobileNo,
                    parsedData.email,
                    parsedData.enable,
                    parsedData.accessToken,
                    expirationTime
                );
                return user;
            }),
            tap(user => {
                if (user) {
                    this._user.next(user);
                }
            }),
            map(user => {
                return !!user;
            })
        );
    }

    signup(firstName: string, lastName: string, mobileNo: string, password: string, email: string) {
        return this.http
            .post<any>(
                `/api/public/user/signup`,
                {firstName: firstName, lastName: lastName, mobileNo: mobileNo, password: password, email: email}
            ).pipe(map(response => {
                return response;
            }));
    }

    login(mobileNo: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                `/api/public/user/signin`,
                {mobileNo: mobileNo, password: password}
            )
            .pipe(tap(this.setUserData.bind(this)));
    }

    logout() {
        console.log('logout');
        this.signOut().subscribe();

        if (this.activeLogoutTimer) {
            clearTimeout(this.activeLogoutTimer);
        }
        this._user.next(null);
        Plugins.Storage.remove({key: 'authData'});
    }

    signOut() {
        return this.token.pipe(
            take(1),
            switchMap(userId => {
                if (!userId) {
                    throw new Error('User not found!');
                }
                return this.token;
            }),
            take(1),
            switchMap(token => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    })
                };
                return this.http.put(
                    `/api/private/user/signout`,
                    {},
                    httpOptions
                );
            }),
            tap(() => {
                return;
            })
        );
    }

    ngOnDestroy() {
        if (this.activeLogoutTimer) {
            clearTimeout(this.activeLogoutTimer);
        }
    }

    private autoLogout(duration: number) {
        if (this.activeLogoutTimer) {
            clearTimeout(this.activeLogoutTimer);
        }
        this.activeLogoutTimer = setTimeout(() => {
            this.logout();
        }, duration);
    }

    private setUserData(userData: AuthResponseData) {
        const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
        );
        const user = new User(
            userData.id,
            userData.firstName,
            userData.lastName,
            userData.mobileNo,
            userData.email,
            userData.enable,
            userData.accessToken,
            expirationTime
        );

        this._user.next(user);
        this.autoLogout(user.tokenDuration);

        this.storeAuthData(
            userData.id,
            userData.firstName,
            userData.lastName,
            userData.mobileNo,
            userData.email,
            userData.enable,
            userData.accessToken,
            expirationTime.toISOString()
        );
    }

    private storeAuthData(
        id: string,
        firstName: string,
        lastName: string,
        mobileNo: string,
        email: string,
        enable: boolean,
        accessToken: string,
        tokenExpirationDate: string,
    ) {
        const data = JSON.stringify({
            id: id,
            firstName: firstName,
            lastName: lastName,
            mobileNo: mobileNo,
            email: email,
            enable: enable,
            accessToken: accessToken,
            tokenExpirationDate: tokenExpirationDate,
        });
        Plugins.Storage.set({key: 'authData', value: data});
    }
}
