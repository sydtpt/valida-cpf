import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class StatusService {
    constructor(private http: HttpClient) { }

    public getStatus() {
        return this.http.get('http://localhost:5000/status');
    }
}