import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    // this.authService.login(form.value.name, form.value.password)
    //   .subscribe((data) => console.log(data), (error) => console.log(error));
  }

}
