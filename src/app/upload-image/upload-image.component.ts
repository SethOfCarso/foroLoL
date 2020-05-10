import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadsService } from '../uploads.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  image;
  @Output() successful = new EventEmitter();

  constructor(private uploadsService: UploadsService) { }

  ngOnInit(): void {
  }

  getImage(event) {
    this.image = event.target.files[0];
  }

  submit(form: NgForm) {
    const formData = new FormData();
    formData.append('image', this.image);
    this.uploadsService.uploadImage(formData)
      .subscribe(
          (image) => {
            alert('La imagen se subió correctamente');
            this.successful.emit(image);
            form.reset();
          },
          (responseError) => {
            alert(responseError.error.msg);
          }
      );
  }

}
