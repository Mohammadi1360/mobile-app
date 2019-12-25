import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../shared/services/language.service';
import {AppLanguage} from '../shared/enum/share.enum';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.page.html',
    styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
    private currentLanguage: AppLanguage = AppLanguage.FA;

    constructor(private languageService: LanguageService) {
    }

    ngOnInit() {
        this.currentLanguage = this.languageService.getCurrentLanguage();
    }

    onSelectLanguage(event) {
        if (event.detail.value === 'fa') {
            this.languageService.setLanguage(AppLanguage.FA);
            this.currentLanguage = AppLanguage.FA;
        } else {
            this.languageService.setLanguage(AppLanguage.EN);
            this.currentLanguage = AppLanguage.EN;
        }

        window.location.reload();
    }
}
