import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonnelsService} from '../personnels.service';
import {Personnel} from '../../shared/model/personnel.model';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {PageMode} from '../../shared/enum/share.enum';
import {tempPerson} from '../../shared/data/tempPerson.data';

// function base64toBlob(base64Data, contentType) {
//     contentType = contentType || '';
//     const sliceSize = 1024;
//     const byteCharacters = window.atob(base64Data);
//     const bytesLength = byteCharacters.length;
//     const slicesCount = Math.ceil(bytesLength / sliceSize);
//     const byteArrays = new Array(slicesCount);
//
//     for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
//         const begin = sliceIndex * sliceSize;
//         const end = Math.min(begin + sliceSize, bytesLength);
//
//         const bytes = new Array(end - begin);
//         for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
//             bytes[i] = byteCharacters[offset].charCodeAt(0);
//         }
//         byteArrays[sliceIndex] = new Uint8Array(bytes);
//     }
//     return new Blob(byteArrays, { type: contentType });
// }

@Component({
    selector: 'app-personnel-dialog',
    templateUrl: './personnel-dialog.page.html',
    styleUrls: ['./personnel-dialog.page.scss'],
})
export class PersonnelDialogPage implements OnInit, OnDestroy {
    @ViewChild('pForm') pForm: NgForm;

    private pageSub: Subscription;
    private pageMode: PageMode = PageMode.INSERT;
    form: FormGroup;
    currentPerson: Personnel = tempPerson;

    constructor(
        private personnelService: PersonnelsService,
        private router: Router,
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        private translate: TranslateService
    ) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (paramMap.has('personnelId')) {
                this.pageMode = PageMode.EDIT;
                // edit personnel
                this.pageSub = this.personnelService.getPersonnel(paramMap.get('personnelId'))
                    .subscribe(personnel => {
                        this.currentPerson = personnel;
                    });
            } else {
                this.pageMode = PageMode.INSERT;
                this.currentPerson = tempPerson;
            }

            // this.form = new FormGroup({
            //     personCode: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.required, Validators.min(1), Validators.max(10000)]
            //     }),
            //     firstName: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.required, Validators.maxLength(160)]
            //     }),
            //     lastName: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.required, Validators.maxLength(160)]
            //     }),
            //     fatherName: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.required, Validators.maxLength(160)]
            //     }),
            //     certificateNo: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.required, Validators.maxLength(40)]
            //     }),
            //     melliCode: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.required, Validators.maxLength(40)]
            //     }),
            //     sex: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.required]
            //     }),
            //     address: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.required, Validators.maxLength(600)]
            //     }),
            //     tel: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.required, Validators.maxLength(30)]
            //     }),
            //     mobile: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.required, Validators.maxLength(30)]
            //     }),
            //     deptAmount: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.min(0)]
            //     }),
            //     trashService: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.required]
            //     }),
            //     neighborId: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.min(0)]
            //     }),
            //     ownerType: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.maxLength(30)]
            //     }),
            //     job: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.maxLength(50)]
            //     }),
            //     buildingDocumentNo: new FormControl(null, {
            //         updateOn: 'blur',
            //         validators: [Validators.maxLength(30)]
            //     })
            // });

            this.pForm.reset();
        });
    }

    onBackButtonClick() {
        this.navCtrl.navigateBack('/personnels');
    }

    onSave() {
        console.log('this.pForm.pristine');
        console.log(this.pForm.pristine);
        console.log('this.pForm.valid');
        console.log(this.pForm.valid);
        if (this.pForm.pristine) {
            this.showMessage('PERSONNEL.MESSAGES.No Change To Save !',
                'warning',
                true,
                'PUBLIC.BTN.Ok');
        } else if (!this.pForm.valid) {
            this.showMessage('PERSONNEL.MESSAGES.Form Is Not Valid',
                'warning',
                true,
                'PUBLIC.BTN.Ok');
        } else {
            console.log('On Save');
            console.log(this.currentPerson);
            this.personnelService.savePersonnel(this.currentPerson).subscribe((response) => {
                console.log('response : =>');
                console.log(response);

                if (response.message === 'PERSONNEL_REGISTERED_SUCCESSFULLY') {
                    this.currentPerson = response.personnel;
                    this.showMessage('PERSONNEL.MESSAGES.New Person Saved Successfully !',
                        'success',
                        true,
                        'PUBLIC.BTN.Ok');
                } else if (response.message === 'PERSONNEL_UPDATED_SUCCESSFULLY') {
                    // this.currentPerson = response.personnel;
                    this.showMessage('PERSONNEL.MESSAGES.Current Person Updated Successfully !',
                        'success',
                        true,
                        'PUBLIC.BTN.Ok');
                }
            }, error => {
                console.log('error : =>');
                console.log(error);

                if (error.error.message === 'PERSONNEL_NOT_EXISTS') {
                    this.showMessage('PERSONNEL.MESSAGES.Can Not Find The Person !',
                        'warning',
                        true,
                        'PUBLIC.BTN.Ok');
                } else {
                    this.showMessage('PERSONNEL.MESSAGES.Error In Save !',
                        'danger',
                        true,
                        'PUBLIC.BTN.Ok');
                }
            });
        }

    }

    onCancel() {
        if (this.pForm.pristine) {
            this.navCtrl.navigateBack('/personnels');
        } else {
            this.showMessage('PERSONNEL.MESSAGES.Form Data Changed , Are You Sure To Leave Without Save ?',
                'warning',
                true,
                'PUBLIC.BTN.Ok', true).then(toast => {
                console.log(toast);
            } );
        }

    }

    async showMessage(messageText: string, type: string,
                      showCloseButton: boolean,
                      closeButtonText: string,
                      isQuestion?: boolean) {

        let toast = null;

        if (isQuestion) {
            toast = await this.toastCtrl.create({
                message: this.translate.instant(messageText),
                position: 'middle',
                color: type,
                buttons: [
                    {
                        text: this.translate.instant('PUBLIC.BTN.Yes'),
                        handler: () => {
                            return true;
                        }
                    },
                    {
                        text: this.translate.instant('PUBLIC.BTN.No'),
                        role: 'cancel',
                        handler: () => {
                            return false;
                        }
                    }
                ]
            });
        } else {
            toast = await this.toastCtrl.create({
                message: this.translate.instant(messageText),
                position: 'middle',
                color: type,
                buttons: [
                    {
                        text: this.translate.instant(closeButtonText),
                        handler: () => {
                            console.log('Save btn clicked');
                        }
                    }
                ]
            });
        }

        toast.present();
    }

    ionViewWillEnter() {
    }

    // onLocationPicked(location: PlaceLocation) {
    //     this.form.patchValue({ location: location });
    // }

    // onImagePicked(imageData: string | File) {
    //     let imageFile;
    //     if (typeof imageData === 'string') {
    //         try {
    //             imageFile = base64toBlob(
    //                 imageData.replace('data:image/jpeg;base64,', ''),
    //                 'image/jpeg'
    //             );
    //         } catch (error) {
    //             console.log(error);
    //             return;
    //         }
    //     } else {
    //         imageFile = imageData;
    //     }
    //     this.form.patchValue({ image: imageFile });
    // }

    // onCreateOffer() {
    //     if (!this.form.valid || !this.form.get('image').value) {
    //         return;
    //     }
    //     this.loadingCtrl
    //         .create({
    //             message: 'Creating place...'
    //         })
    //         .then(loadingEl => {
    //             loadingEl.present();
    //             this.placesService
    //                 .uploadImage(this.form.get('image').value)
    //                 .pipe(
    //                     switchMap(uploadRes => {
    //                         return this.placesService.addPlace(
    //                             this.form.value.title,
    //                             this.form.value.description,
    //                             +this.form.value.price,
    //                             new Date(this.form.value.dateFrom),
    //                             new Date(this.form.value.dateTo),
    //                             this.form.value.location,
    //                             uploadRes.imageUrl
    //                         );
    //                     })
    //                 )
    //                 .subscribe(() => {
    //                     loadingEl.dismiss();
    //                     this.form.reset();
    //                     this.router.navigate(['/places/tabs/offers']);
    //                 });
    //         });
    // }

    ngOnDestroy() {
        if (this.pageSub) {
            this.pageSub.unsubscribe();
        }
    }

}
