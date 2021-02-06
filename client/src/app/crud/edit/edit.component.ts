import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../models/post";
import {PostsService} from "../../services/posts.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  error: string;
  post: Post;
  editForm: FormGroup;
  submitted: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private postService: PostsService,
      private router: Router
  ) { }

  ngOnInit(): void {
    let postId = this.route.snapshot.paramMap.get('id');
    if (postId != null) {
      this.postService.getOne(postId).subscribe(post => {
        this.post = post;

        this.editForm = this.formBuilder.group({
          title: [this.post.title, Validators.required],
          message: [this.post.message, [Validators.required, Validators.minLength(5)]]
        });
      }, err => {
        this.error = err.error;
      });
    }
    else {
      this.router.navigateByUrl('/read');
    }
  }

  enregistrer(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.postService.edit(this.post._id, this.editForm.getRawValue()).subscribe(() => {
        this.router.navigateByUrl('/read');
      }, err => {
        this.error = err.error;
      });
    }
  }

}
