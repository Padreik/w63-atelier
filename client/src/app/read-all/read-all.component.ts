import { Component, OnInit } from '@angular/core';
import {Post} from "../models/post";
import {PostsService} from "../services/posts.service";
import * as moment from 'moment';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.scss']
})
export class ReadAllComponent implements OnInit {

  posts!: Post[];
  moment = moment;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

}
