import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PersonnelsPage} from './personnels.page';
import {PersonnelItemComponent} from './personnel-item/personnel-item.component';
import {TranslateModule} from '@ngx-translate/core';
// import {PersonnelsRoutingModule} from './personnel-routing-module';

const routes: Routes = [
    {
        path: '',
        component: PersonnelsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule
    ],
    declarations: [PersonnelsPage, PersonnelItemComponent]
})
export class PersonnelsPageModule {
}
