import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Personnel} from '../shared/model/personnel.model';
import {PersonnelsService} from './personnels.service';
import {AlertController, IonItemSliding} from '@ionic/angular';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-personnels',
    templateUrl: './personnels.page.html',
    styleUrls: ['./personnels.page.scss'],
})
export class PersonnelsPage implements OnInit, OnDestroy {
    initPersonnelList: Personnel[];
    personnelList: Personnel[];
    private pageSub: Subscription;

    constructor(
        private personnelsService: PersonnelsService,
        private alertCtrl: AlertController,
        private translate: TranslateService,
        private router: Router) {
    }

    ngOnInit() {
        this.pageSub = this.personnelsService.personnels.subscribe((personnelList) => {
            this.personnelList = personnelList;
            this.initPersonnelList = this.personnelList;
        });
    }

    ionViewWillEnter() {
        this.refreshPersonnelList();
    }

    refreshPersonnelList() {
        this.personnelsService.fetchPersonnelList().subscribe((personnelList) => {
            this.personnelList = personnelList;
            this.initPersonnelList = this.personnelList;
        });
    }

    getItems(ev) {
        // Reset items back to all of the items
        this.personnelList = this.initPersonnelList;
        // set val to the value of the ev target
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() !== '') {
            this.personnelList = this.personnelList.filter((item) => {
                return (item.lastName.indexOf(val) > -1);
            });
        }
    }

    onEdit(personId: string, slidingItem: IonItemSliding) {
        slidingItem.close();
        this.router.navigate(['/', 'personnels', 'personnel-dialog', personId]);
        console.log('Editing Personnel', personId);
    }

    onDelete(personId: string, slidingItem: IonItemSliding) {
        slidingItem.close();
        this.alertCtrl.create({
            header: this.translate.instant('PERSONNEL.MESSAGES.Delete Person'),
            message: this.translate.instant('PERSONNEL.MESSAGES.Are You Sure ?'),
            buttons: [
                {
                    text: this.translate.instant('PUBLIC.BTN.Yes'),
                    handler: () => {
                        this.personnelsService.deletePersonnel(personId);
                        this.refreshPersonnelList();
                    }
                },
                {
                    text: this.translate.instant('PUBLIC.BTN.No'),
                    role: 'cancel',
                    handler: () => {
                        console.log('No clicked');
                    }
                }
            ]
        }).then(alertEl => alertEl.present());
    }

    ngOnDestroy() {
        if (this.pageSub) {
            this.pageSub.unsubscribe();
        }
    }
}
