import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    {path: '', redirectTo: 'places', pathMatch: 'full'},
    {path: 'auth', loadChildren: './auth/auth.module#AuthPageModule'},
    {
        path: 'places',
        loadChildren: './places/places.module#PlacesPageModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'bookings',
        loadChildren: './bookings/bookings.module#BookingsPageModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'personnels',
        children: [
            {
                path: '',
                loadChildren: './personnels/personnels.module#PersonnelsPageModule'
            },
            {
                path: 'personnel-dialog',
                loadChildren:
                    './personnels/personnel-dialog/personnel-dialog.module#PersonnelDialogPageModule'
            },
            {
                path: 'personnel-dialog/:personnelId',
                loadChildren:
                    './personnels/personnel-dialog/personnel-dialog.module#PersonnelDialogPageModule'
            }
        ],
        canLoad: [AuthGuard]
    },
    {
        path: 'setting',
        loadChildren: './setting/setting.module#SettingPageModule',
        canLoad: [AuthGuard]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
