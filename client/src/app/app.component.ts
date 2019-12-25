import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AuthService} from './auth/auth.service';
import {Subscription} from 'rxjs';
import {LanguageService} from './shared/services/language.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private authSub: Subscription;
    private previouseAuthState = false;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthService,
        private router: Router,
        private languageService: LanguageService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.languageService.setInitialAppLanguage();
        });
    }

    ngOnInit() {
        this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
            if (!isAuth && this.previouseAuthState !== isAuth) {
                this.router.navigateByUrl('/auth');
            }
            this.previouseAuthState = isAuth;
        });
    }

    ngOnDestroy() {
        if (this.authSub) {
            this.authSub.unsubscribe();
        }
    }

    onLogout() {
        this.authService.logout();
        // this.router.navigateByUrl('/auth');
    }
}
