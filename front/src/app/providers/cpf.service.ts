import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CpfService {
    constructor(private http: HttpClient) { }

    public isBlocked(cpf: string) {
        return this.http.get('http://localhost:5000/consulta?cpf=' + cpf);
    }

    public block(cpf: string) {
        const body = { cpf: cpf }
        return this.http.post('http://localhost:5000/cpf', body);
    }

    public unblock(cpf: string) {
        return this.http.delete('http://localhost:5000/cpf/' + cpf);
    }

    public getAll() {
        return this.http.get('http://localhost:5000/cpf');
    }
}