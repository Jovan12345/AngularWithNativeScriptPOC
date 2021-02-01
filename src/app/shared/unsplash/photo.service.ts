import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class UnsplashService {

    constructor(private http: HttpClient) { }

    getUnsplash(page: Number) {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Client-ID 6ynw87MG__85eXRfJ7gyXkq1Ahbpj3UFt90yYjz51hs'
            }),
            params: new HttpParams().set('page', page.toString())

        }


        return this.http.get(`https://api.unsplash.com/photos`, httpOptions)
            .pipe(
                catchError(this.handleErrors)
            )
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
}
