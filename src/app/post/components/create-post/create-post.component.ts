import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  imageBtnClicked: boolean = false;
  pdfBtnClicked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  uploadedImage: File;
  imagePreview: any;

  onImageChange(event) {
    let image = event.target.files[0];

    this.ng2ImgMax.compressImage(image, 0.075, true).subscribe(
      result => {
        this.uploadedImage = new File([result], result.name);
        this.getImagePreview(this.uploadedImage);
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
  }

  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      text: ['', [Validators.required]]
    });
  }
}
