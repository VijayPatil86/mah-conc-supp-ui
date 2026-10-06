import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-page',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './page.component.html',
    styleUrl: './page.component.css'
})

export class PageComponent {
    constructor(private http: HttpClient) {}

    sendOtp(event: Event) {
        event.preventDefault(); // stop the "#" link from jumping to the top
        this.http.get('http://desktop-h04g8vv:8001/api/auth/test').subscribe({
            next: (response) => {
                console.log('OTP sent successfully', response);
            },
            error: (error) => {
                console.error('Error sending OTP', error);
            }
        });
    }
}