import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { Post } from "src/app/models/post/post.model";
import { AuthService } from "src/app/services/authentication/auth.service";
import { TimestampService } from "src/app/services/utility/timestamp.service";
import { PostService } from "src/app/services/database/post.service";
import { Router } from "@angular/router";
import { Ng2ImgMaxService } from "ng2-img-max";
import { DomSanitizer } from "@angular/platform-browser";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"]
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  imageBtnClicked: boolean = false;
  imageName: string;
  imageDownloadUrl: string;
  pdfBtnClicked: boolean = false;
  pdfName: string;
  pdfDownloadUrl: string;
  newPost: Post;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private timeService: TimestampService,
    private postService: PostService,
    private storage: AngularFireStorage,
    private router: Router,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) {}

  @ViewChild("autosize") autosize: CdkTextareaAutosize;
  @ViewChild("image") image: ElementRef;
  @ViewChild("pdf") pdf: ElementRef;

  postImage: File;
  postPdf: File;
  imagePreview: any;

  removeImage() {
    this.imageBtnClicked = false;
    this.imagePreview = "";
    this.imageName = "";
    this.image.nativeElement.value = null;
    this.postImage = null;
  }

  removePdf() {
    this.pdfBtnClicked = false;
    this.pdfName = "";
    this.pdf.nativeElement.value = null;
  }

  onImageChange(event) {
    let image = event.target.files[0];
    this.imageName = image.name;
    this.imageBtnClicked = true;
    // this.postImage = image;
    this.ng2ImgMax.compressImage(image, 0.075, true).subscribe(
      result => {
        console.log(result.type);
        this.postImage = new File([result], result.name, { type: result.type });
        // this.postImage.type = result.type;
        this.getImagePreview(this.postImage);
        console.log(this.postImage);
      },
      error => {
        console.log("😢 Oh no!", error);
        this.removeImage();
        alert("Unsupported image type");
      }
    );
  }

  onPdfChange(event) {
    let pdf = event.target.files[0];
    if (pdf.name.slice(-3) != "pdf") {
      this.removePdf();
      alert("Attached file is not pdf!!");
      return;
    }
    if (pdf.size > 5242880) {
      this.removePdf();
      alert("Attached PDF size exceeds allowed limit of 5 MB!!");
      return;
    }
    this.postPdf = pdf;
    this.pdfName = pdf.name;
    this.pdfBtnClicked = true;
    console.log(pdf.size, pdf);
  }

  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
  }

  uploadImage(image: File, postid) {
    const imagePath = `Posts/new_${postid}`;
    const ref = this.storage.ref(imagePath);
    const task = this.storage.upload(imagePath, image);
    task
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          this.imageDownloadUrl = await ref.getDownloadURL().toPromise();
          console.log(this.imageDownloadUrl);
          this.postService.addPostImageUrl(this.imageDownloadUrl, postid);
        })
      )
      .subscribe();
  }

  uploadPdf(pdf: File, postid) {
    const pdfPath = `Pdfs/pdf#${postid}`;
    const ref = this.storage.ref(pdfPath);
    const task = this.storage.upload(pdfPath, pdf);
    task
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          this.pdfDownloadUrl = await ref.getDownloadURL().toPromise();
          console.log(this.pdfDownloadUrl);
          this.postService.addPostPdfUrl(this.pdfDownloadUrl, postid);
        })
      )
      .subscribe();
  }

  async postSubmit() {
    console.log(this.postForm.value);
    const { text } = this.postForm.value;
    const image = this.postImage ? this.postImage : null;
    const pdf = this.postPdf ? this.postPdf : null;
    if (text === "") {
      alert("Post text content cannot be empty!");
      return;
    }

    if (image && pdf) {
      this.removeImage();
      this.removePdf();
      alert("Only 1 attachment allowed!!");
      return;
    }
    const uid = await this.authService.userID;
    const timestamp = this.timeService.timestamp;
    this.newPost = {
      uid,
      text,
      timestamp
    };

    if (image) {
      this.newPost.image_url = "";
    }

    if (pdf) {
      this.newPost.pdf_url = "";
    }

    console.log(this.newPost);
    this.postService
      .addPost(this.newPost)
      .then(async post => {
        if (image) {
          await this.uploadImage(image, post.key);
        }
        if (pdf) {
          await this.uploadPdf(pdf, post.key);
        }
        // console.log(post.key);
        this.postForm.reset();
        this.redirectTo("posts");
      })
      .catch(err => console.log(err));
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  buildform() {
    this.postForm = this.formBuilder.group({
      text: ["", [Validators.required]],
      image: [null],
      pdf: [null]
    });
  }

  ngOnInit() {
    this.buildform();
  }
}
