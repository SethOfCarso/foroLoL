import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  @Output() successful = new EventEmitter();
  environment: string;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.environment = authService.getEnvironmentUrl();

    // Get all the query params sent by Google
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.code) {
        // Finish Google authentication
        this.authService.googleLogin(params).subscribe(
          () => {
            this.successful.emit();
          },
          (responseError) => {
            alert(responseError.error.msg);
          }
        );
      }
    });
  }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    this.authService.login(form.value.email, form.value.password)
      .subscribe(
        () => {
          this.successful.emit();
          form.reset();
        },
        (responseError) => {
          alert(responseError.error.msg);
        }
      );
  }

}
