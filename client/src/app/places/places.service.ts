import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {take, map, tap, delay, switchMap} from 'rxjs/operators';

import {Place} from './place.model';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../shared/model/user.model';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    private _places = new BehaviorSubject<Place[]>([
        new Place(
            'p1',
            'Manhattan Mansion',
            'In the heart of New York City.',
            'https://handluggageonly.co.uk/wp-content/uploads/2015/01/Hamilton-Pool-Texas-s.jpg',
            149.99,
            new Date('2019-01-01'),
            new Date('2019-12-31'),
            'abc'
        ),
        new Place(
            'p2',
            'L\'Amour Toujours',
            'A romantic place in Paris!',
            'https://i.pinimg.com/originals/2a/23/22/2a2322f4ba635063bf419c0f3c4d78be.jpg',
            189.99,
            new Date('2019-01-01'),
            new Date('2019-12-31'),
            'abc'
        ),
        new Place(
            'p3',
            'The Foggy Palace',
            'Not your average city trip!',
            'http://www.topcrazypress.com/uploads/default/travel/Europe-1.jpg',
            99.99,
            new Date('2019-01-01'),
            new Date('2019-12-31'),
            'abc'
        )
    ]);

    get places() {
        return this._places.asObservable();
    }

    constructor(private authService: AuthService, private http: HttpClient) {
    }

    getPlace(id: string) {
        return this.places.pipe(
            take(1),
            map(places => {
                return {...places.find(p => p.id === id)};
            })
        );
    }

    addPlace(
        title: string,
        description: string,
        price: number,
        dateFrom: Date,
        dateTo: Date
    ) {
        const newPlace = new Place(
            Math.random().toString(),
            title,
            description,
            'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
            price,
            dateFrom,
            dateTo,
            'userId'
        );
        return this.places.pipe(
            take(1),
            delay(1000),
            tap(places => {
                this._places.next(places.concat(newPlace));
            })
        );
    }

    getPlaceService() {
        return this.authService.token.pipe(
            take(1),
            switchMap(token => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    })
                };
                console.log('httpOptions');
                console.log(httpOptions);
                return this.http.get<User>(
                    `/api/private/user/user`,
                    httpOptions
                );
            }),
            map(data => {
                console.log(data);
                return;
            })
        );
    }

    updatePlace(placeId: string, title: string, description: string) {
        return this.places.pipe(
            take(1),
            delay(1000),
            tap(places => {
                const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
                const updatedPlaces = [...places];
                const oldPlace = updatedPlaces[updatedPlaceIndex];
                updatedPlaces[updatedPlaceIndex] = new Place(
                    oldPlace.id,
                    title,
                    description,
                    oldPlace.imageUrl,
                    oldPlace.price,
                    oldPlace.availableFrom,
                    oldPlace.availableTo,
                    oldPlace.userId
                );
                this._places.next(updatedPlaces);
            })
        );
    }
}
