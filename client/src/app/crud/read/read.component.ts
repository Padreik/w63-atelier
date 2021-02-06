import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post";
import {PostsService} from "../../services/posts.service";
import * as moment from "moment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  posts: Post[];
  moment = moment;
  post: Post;
  deleteError: string;

  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this.postsService.getMine().subscribe(posts => {
      this.posts = posts;
    });
  }

  deleteInit(post: Post) {
    this.deleteError = '';
    this.post = post;
  }

  delete() {
    this.postsService.delete(this.post._id).subscribe(() => {
      document.location.reload();
    }, error => {
      this.deleteError = error.error;
    });
  }

}
