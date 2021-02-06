import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  newForm: FormGroup;
  submitted: boolean = false;

  constructor(
      private formBuilder: FormBuilder, private postService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  enregistrer(): void {
    this.submitted = true;
    if (this.newForm.valid) {
      this.postService.add(this.newForm.getRawValue());
      this.router.navigateByUrl('/read');
    }
  }

}
