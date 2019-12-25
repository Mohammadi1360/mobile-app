import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {LoadingController, AlertController} from '@ionic/angular';
import {Observable} from 'rxjs';

import {AuthService, AuthResponseData} from './auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
    isLoading = false;
    isLogin = true;

    constructor(
        private authService: AuthService,
        private router: Router,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private translate: TranslateService,
    ) {
    }

    ngOnInit() {
    }

    authenticate(mobileNo: string, password: string) {
        this.isLoading = true;
        this.loadingCtrl
            .create({keyboardClose: true, message: 'Logging in...'})
            .then(loadingEl => {
                loadingEl.present();
                let authObs: Observable<AuthResponseData>;
                authObs = this.authService.login(mobileNo, password);

                authObs.subscribe(
                    resData => {
                        console.log('Success Login...');
                        console.log(resData);
                        this.isLoading = false;
                        loadingEl.dismiss();
                        this.router.navigateByUrl('/places/tabs/discover');
                    },
                    errRes => {
                        console.log('Error Login...');
                        loadingEl.dismiss();
                        console.log(errRes);
                        const code = errRes.error.message;
                        let message = 'Could not login, please try again.';

                        if (code === 'MOBILE_NO_NOT_FOUND') {
                            message = 'Your Mobile Number could not be found.';
                        } else if (code === 'INVALID_PASSWORD') {
                            message = 'This password is not correct.';
                        }
                        this.showAlert(message);
                    }
                );
            });
    }

    signupUser(firstName: string, lastName: string, mobileNo: string, email: string, password: string) {
        this.isLoading = true;
        this.loadingCtrl
            .create({keyboardClose: true, message: 'Logging in...'})
            .then(loadingEl => {
                loadingEl.present();
                let authObs: Observable<any>;
                authObs = this.authService.signup(firstName, lastName, mobileNo, password, email);

                authObs.subscribe(
                    resData => {
                        console.log('Success Login...');
                        console.log(resData);
                        this.isLoading = false;
                        loadingEl.dismiss();
                        this.isLogin = true;
                        // this.router.navigateByUrl('/places/tabs/discover');
                    },
                    errRes => {
                        console.log('Error Login...');
                        loadingEl.dismiss();
                        console.log(errRes);
                        const code = errRes.error.message;
                        let message = 'Could not sign you up, please try again.';

                        if (code === 'EMAIL_EXISTS') {
                            message = 'This email address exists already!';
                        } else if (code === 'MOBILE_NO_EXISTS') {
                            message = 'This Mobile Number exists already!';
                        }

                        this.showAlert(message);
                    }
                );
            });
    }

    onSwitchAuthMode() {
        this.isLogin = !this.isLogin;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const mobileNo = form.value.mobileNo;
        const password = form.value.password;

        if (!this.isLogin) {
            const confirmPassword = form.value.confirmPassword;
            const firstName = form.value.firstName;
            const lastName = form.value.lastName;
            const email = form.value.email;

            console.log(password);
            console.log(confirmPassword);

            if (password === confirmPassword) {
                this.signupUser(firstName, lastName, mobileNo, email, password);
            } else {
                const message = 'Passwords are not Matche !';
                this.showAlert(message);
            }

        } else {
            this.authenticate(mobileNo, password);
            form.reset();
        }

    }

    private showAlert(message: string) {
        this.alertCtrl
            .create({
                header: 'Authentication failed',
                message: message,
                buttons: ['Okay']
            })
            .then(alertEl => alertEl.present());
    }
}
