import { Service } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface OtpSuccessResponse {
    message: string;
}
export interface ValidationError {
    error: string;
    fields: {
        [key: string]: string;
    };
}
@Service()
export class LoginService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

    sendOtp(userName: string): Observable<OtpSuccessResponse> {
        userName = userName.concat('@', environment.email_GMail_Domain_Name);
        return this.http.post<OtpSuccessResponse>(`${this.baseUrl}/auth/send-otp`, { userName });
    }
}