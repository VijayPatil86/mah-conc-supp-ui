import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/AuthService';

@Component({
    selector: 'app-page',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './page.component.html',
    styleUrl: './page.component.css'
})

export class PageComponent {
    username: string = '';
    usernameError = '';
    otp: string = '';
    otpError = '';

    constructor(private authService: AuthService) {}

    onSendOtp(event: Event) {
        event.preventDefault(); // stop the "#" link from jumping to the top
        this.usernameError = ''; // Reset the error message

        if(this.username.trim() === '') {
            this.usernameError = 'Username is required.';
            return;
        }

        this.authService.sendOtp(this.username).subscribe({
            next: (response) => {
                console.log('OTP sent successfully', response);
            },
            error: (error) => {
                console.error('Error sending OTP', error);
                this.usernameError = 'Failed to send OTP. Please try again.';
            }
        });
    }

    login() {
        this.usernameError = this.username.trim() === '' ? 'Username is required.' : '';
        this.otpError = this.otp.trim() === '' ? 'OTP is required.' : '';
        if (this.usernameError || this.otpError) {
            return; // Stop if there are validation errors
        }
        // Add your login logic here
    }
}