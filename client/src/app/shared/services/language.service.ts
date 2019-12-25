import {Platform} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {AppDirection, AppLanguage} from '../enum/share.enum';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private htmlRoot = document.documentElement;
    private currentDirection: AppDirection = AppDirection.RTL;
    private currentLanguage: AppLanguage = AppLanguage.FA;

    constructor(
        private translate: TranslateService,
        private plt: Platform) {
    }

    getCurrentDirection() {
        return this.currentDirection;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    setInitialAppLanguage() {
        // let language = this.translate.getBrowserLang();
        this.translate.setDefaultLang('fa');

        Plugins.Storage.get({key: LNG_KEY}).then(val => {
            if (val.value) {
                if (val.value === 'fa') {
                    this.setLanguage(AppLanguage.FA);
                } else {
                    this.setLanguage(AppLanguage.EN);
                }
            }
        });
    }

    // getLanguages() {
    //     return [
    //         {text: 'English', value: 'en', img: 'assets/images/en.png'},
    //         {text: 'Persian', value: 'fa', img: 'assets/images/fa.png'},
    //     ];
    // }

    setLanguage(lng: AppLanguage) {
        if (lng === AppLanguage.FA) {
            this.currentDirection = AppDirection.RTL;
            this.currentLanguage = AppLanguage.FA;
        } else {
            this.currentDirection = AppDirection.LTR;
            this.currentLanguage = AppLanguage.EN;
        }

        this.htmlRoot.setAttribute('dir', this.currentDirection);
        this.translate.use(lng);
        Plugins.Storage.set({key: LNG_KEY, value: lng});
    }
}