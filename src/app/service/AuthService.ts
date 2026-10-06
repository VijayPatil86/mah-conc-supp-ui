import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SendOtpResponse } from '../interface/sendOtpResponse-response.model';

@Service()
export class AuthService {
    private http = inject(HttpClient);
    private baseUrl = environment.baseUrl;

    sendOtp(userName: string): Observable<SendOtpResponse> {
        return this.http.post<SendOtpResponse>(`${this.baseUrl}/auth/send-otp`,
            { userName: userName });
    }

    login(username: string, otp: string) {
        return this.http.post(`${this.baseUrl}/login`, { username, otp });
    }
}