import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Output() successful = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    this.authService.signin(form.value.email, form.value.password, form.value.username)
      .subscribe(
        () => {
          alert('Usuario registrado correctamente');
          this.successful.emit();
          form.reset();
        },
        (responseError) => {
          alert(responseError.error.msg);
        }
      );
  }

}
