import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  imageBtnClicked: boolean = false;
  pdfBtnClicked: boolean = false;

  constructor(private formBuilder: FormBuilder) {}
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  ngOnInit() {
    this.postForm = this.formBuilder.group({
      text: ['', [Validators.required]]
    });
  }
}
