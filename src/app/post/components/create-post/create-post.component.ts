import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { PostService, ProfileService } from "../../../core";
import { Router } from "@angular/router";
import { Ng2ImgMaxService } from "ng2-img-max";
import { DomSanitizer } from "@angular/platform-browser";

import { finalize, switchMap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"],
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  imageBtnClicked: boolean = false;
  imageName: string;
  imageDownloadUrl: string;
  pdfBtnClicked: boolean = false;
  pdfName: string;
  pdfDownloadUrl: string;
  newPost: any;
  progress: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private profileService: ProfileService,
    private router: Router,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar
  ) {}

  @ViewChild("postform") postform;
  @ViewChild("autosize") autosize: CdkTextareaAutosize;
  @ViewChild("image") image: ElementRef;
  @ViewChild("pdf") pdf: ElementRef;

  postImage: File;
  postPdf: File;
  imagePreview: any;
  uploadprogress = 0;
  progressmode = "determinate";
  message = "";

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: "success-dialog",
    });
  }

  removeImage() {
    this.imageBtnClicked = false;
    this.imagePreview = "";
    this.imageName = "";
    this.image.nativeElement.value = null;
    this.postForm.controls["image"].reset();
    this.postImage = null;
    this.openSnackBar("Image removed!", "REMOVED");
  }

  removePdf() {
    this.pdfBtnClicked = false;
    this.pdfName = "";
    this.pdf.nativeElement.value = null;
    this.postForm.controls["pdf"].reset();
    this.postPdf = null;
    this.openSnackBar("PDF removed!", "REMOVED");
  }

  onImageChange(event) {
    let image = event.target.files[0];
    this.imageName = image.name;
    this.imageBtnClicked = true;
    // this.postImage = image;
    this.ng2ImgMax.compressImage(image, 0.075, true).subscribe(
      (result) => {
        // console.log(result.type);
        this.postImage = new File([result], result.name, { type: result.type });
        // this.postImage.type = result.type;
        this.getImagePreview(this.postImage);
        // console.log(this.postImage);
      },
      (error) => {
        console.log("😢 Oh no!", error);
        this.removeImage();
        this.message = "Unsupported image type";
      }
    );
  }

  onPdfChange(event) {
    let pdf = event.target.files[0];
    if (pdf.name.slice(-3) != "pdf") {
      this.removePdf();
      this.message = "Attached file is not pdf!!";
      return;
    }
    if (pdf.size > 20000000) {
      this.removePdf();
      this.message = "Attached PDF size exceeds allowed limit of 20 MB!";
      return;
    }
    this.postPdf = pdf;
    this.pdfName = pdf.name;
    this.pdfBtnClicked = true;
    // console.log(pdf.size, pdf);
  }

  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
  }

  getHashtags(text) {
    const regexp = /\B\#\w\w+\b/g;
    const result = text.match(regexp);
    if (result) return result.map((hashtag) => hashtag.replace("#", ""));
    return [];
  }

  async postSubmit() {
    // console.log(this.postForm.value);
    this.message = "";
    let { text = "" } = this.postForm.value;
    const image = this.postImage ? this.postImage : null;
    const pdf = this.postPdf ? this.postPdf : null;
    text = text.trim();
    if (text === "") {
      this.message = "Post text content cannot be empty!";
      return;
    }

    if (image && pdf) {
      this.removeImage();
      this.removePdf();
      this.message = "Only 1 attachment allowed!";
      return;
    }
    this.progress = true;

    const mention_tag = this.getHashtags(text);
    this.newPost = {
      text,
      mention_tag,
      media_type: 0,
    };

    let file;
    if (image) {
      this.newPost.media_type = 1;
      file = image;
    } else if (pdf) {
      this.newPost.media_type = 2;
      file = pdf;
    }
    // console.log(this.newPost);
    this.postForm.reset();
    this.postform.resetForm();

    const user$ = await this.profileService.getUser();
    user$
      .pipe(
        switchMap(({ _id }) =>
          this.postService.createPost({
            user_id: _id,
            body: this.newPost,
            file,
          })
        )
      )
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.Response) {
            console.log("post created successfully");
            this.redirectTo("posts");
          } else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((100 * event.loaded) / event.total);
            this.uploadprogress = percentDone;
            if (this.uploadprogress === 100) {
              this.progressmode = "indeterminate";
            }
            console.log("Progress " + percentDone + "%");
          }
          // this.redirectTo("posts");
        },
        (error) => {
          this.progress = false;
          this.message = "Something went wrong!";
          console.log({ error });
        },
        () => console.log("create post complete")
      );
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
      pdf: [null],
    });
  }

  ngOnInit() {
    this.buildform();
  }
}

//   uploadImage(image: File, postid) {
//     const imagePath = `Posts/new_${postid}`;
//     const ref = this.storage.ref(imagePath);
//     const task = this.storage.upload(imagePath, image);
//     // this.progress = task.percentageChanges();
//     task
//       .snapshotChanges()
//       .pipe(
//         finalize(async () => {
//           this.imageDownloadUrl = await ref.getDownloadURL().toPromise();
//           // console.log(this.imageDownloadUrl);
//           this.postService
//             .addPostImageUrl(this.imageDownloadUrl, postid)
//             .then(() => {
//               this.progress = false;
//               this.postForm.reset();
//               this.postform.resetForm();
//               this.redirectTo("posts");
//             })
//             .catch(err => console.log(err));
//         })
//       )
//       .subscribe();
//   }

//   uploadPdf(pdf: File, postid) {
//     const pdfPath = `Pdfs/pdf#${postid}`;
//     const ref = this.storage.ref(pdfPath);
//     const task = this.storage.upload(pdfPath, pdf);

//     task
//       .snapshotChanges()
//       .pipe(
//         finalize(async () => {
//           this.pdfDownloadUrl = await ref.getDownloadURL().toPromise();
//           // console.log(this.pdfDownloadUrl);
//           this.postService
//             .addPostPdfUrl(this.pdfDownloadUrl, postid)
//             .then(() => {
//               this.progress = false;
//               this.postForm.reset();
//               this.postform.resetForm();
//               this.redirectTo("posts");
//             })
//             .catch(err => console.log(err));
//         })
//       )
//       .subscribe();
//   }
