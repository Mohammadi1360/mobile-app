import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PersonnelsPage} from './personnels.page';

const routes: Routes = [
    {
        path: 'personnels',
        component: PersonnelsPage,
        children: [
            {
                path: 'personnel/personnel-dialog',
                children: [
                    {
                        path: '',
                        loadChildren: 'personnel-dialog/personnel-dialog.module#PersonnelDialogPageModule'
                    },
                    {
                        path: ':placeId',
                        loadChildren:
                            './personnels/personnel-dialog/personnel-dialog.module#PersonnelDialogPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/personnels',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/personnels',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonnelsRoutingModule {
}
