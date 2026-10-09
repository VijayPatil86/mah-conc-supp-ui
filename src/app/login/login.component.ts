import { Component, signal } from '@angular/core';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService, ValidationError } from './login.service';

@Component({
    selector: 'app-login',
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    private loginService = inject(LoginService);
    userName = '';
    otp = '';

    errors = signal<Record<string, string>>({});
    successMessage = signal('');

    clearError(field: string) {
        this.errors.update(e => ({ ...e, [field]: '' }));
        this.successMessage.set('');
    }

    onSendOtp(event: Event) {
        event.preventDefault();
        this.errors.set({});
        this.successMessage.set('');

        if(!this.userName.trim()) {
            this.errors.update(e => ({ ...e, userName: 'User Name is required' }));
            return;
        }

        this.loginService.sendOtp(this.userName).subscribe({
            next: (response) => {
                this.successMessage.set(response.message)
                console.log('OTP sent successfully-----:', response.message);
            },
            error: (error: HttpErrorResponse) =>
                this.showError(error, 'userName', 'Failed to send OTP. Please try again.')
        });
    }

    private showError(error: HttpErrorResponse, field: string, defaultMessage: string) {
        if (error.status === 400) {
            this.errors.set((error.error as ValidationError)?.fields ?? {[field]: defaultMessage});
        } else if (error.status === 0){
            this.errors.set({[field]: 'Cannot connect to the server. Please check your internet connection.'});
        } else {
            this.errors.set({[field]: defaultMessage});
        }
    }
}
