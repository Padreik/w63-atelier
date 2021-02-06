import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {Post} from "../models/post";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/post/all`);
  }

  getMine(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/post`);
  }

  getOne(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/post/${id}`);
  }

  add(post: Post): void {
    this.http.post(`${environment.apiUrl}/post`, post, { withCredentials: true}).subscribe();
  }

  edit(id: string, post: Post): Observable<null> {
    return this.http.put<null>(`${environment.apiUrl}/post/${id}`, post, { withCredentials: true });
  }

  delete(id: string): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/post/${id}`);
  }
}
