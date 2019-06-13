import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Post } from 'src/app/models/post/post.model';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { TimestampService } from 'src/app/services/utility/timestamp.service';
import { PostService } from 'src/app/services/database/post.service';
import { Router } from '@angular/router';
// import { Ng2ImgMaxService } from 'ng2-img-max';
// import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  imageBtnClicked: boolean = false;
  pdfBtnClicked: boolean = false;
  newPost:Post;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private timeService: TimestampService,
    private postService: PostService,
    private router: Router
    // private ng2ImgMax: Ng2ImgMaxService,
    // public sanitizer: DomSanitizer
  ) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  // uploadedImage: File;
  // imagePreview: any;

  // onImageChange(event) {
  //   let image = event.target.files[0];

  //   this.ng2ImgMax.compressImage(image, 0.075, true).subscribe(
  //     result => {
  //       this.uploadedImage = new File([result], result.name);
  //       this.getImagePreview(this.uploadedImage);
  //     },
  //     error => {
  //       console.log('😢 Oh no!', error);
  //     }
  //   );
  // }

  // getImagePreview(file: File) {
  //   const reader: FileReader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.imagePreview = reader.result;
  //   };
  // }

  async postSubmit() {
    // console.log(this.postForm.value);
    const { text } = this.postForm.value;
    const uid = await this.authService.userID;
    const timestamp = this.timeService.timestamp;
    this.newPost = {
      uid,
      text,
      timestamp
    }
    console.log(this.newPost);
    this.postService.addPost(this.newPost).then(post => {
      // console.log(post.key);
      this.postForm.reset();
      this.redirectTo('posts');
    }).catch(err => console.log(err));          
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));}

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      text: ['', [Validators.required]]
    });
  }
}