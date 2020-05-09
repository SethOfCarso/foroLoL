import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    // this.authService.login(form.value.name, form.value.password)
    //   .subscribe((data) => console.log(data), (error) => console.log(error));
  }

}
