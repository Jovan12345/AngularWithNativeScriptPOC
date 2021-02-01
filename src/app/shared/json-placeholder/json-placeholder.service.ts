import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { PlaceholderPost } from '../../shared/json-placeholder/json-placeholder.model';

@Injectable()
export class JsonPlaceholderService {
  constructor(private http: HttpClient) { }
  private serverUrl = 'https://jsonplaceholder.typicode.com/';
  getPhotos() {
    return this.http.get(this.serverUrl + 'albums/1/photos')
      .pipe(
        catchError(this.handleErrors)
      )
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error));
    return throwError(error);
  }

  private createRequestOpetion() {
    let headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8'
    })
    return headers;
  }

  // createPost(newPost: PlaceholderPost) {
  //   let options = this.createRequestOpetion();
  //   return this.http.post(this.serverUrl + 'posts',
  //     JSON.stringify({
  //       title: newPost.title,
  //       body: newPost.body,
  //       userId: newPost.userId,
  //     }),
  //     { headers: options }
  //   ).pipe(
  //     map(response => response),
  //     tap(data => console.log(data)),
  //     catchError(this.handleErrors)
  //   );
  // }

  createPost(newPost: PlaceholderPost) {
    if (!newPost.title || !newPost.body || !newPost.userId) {
      return throwError("Please provide all fields for creating a post.");
    }
    let options = this.createRequestOpetion();
    return this.http.post(this.serverUrl + 'posts',
      JSON.stringify({
        title: newPost.title,
        body: newPost.body,
        userId: newPost.userId,
      }),
      { headers: options }
    ).pipe(
      map(response => response),
      catchError(this.handleErrors)
    )
  }
}
