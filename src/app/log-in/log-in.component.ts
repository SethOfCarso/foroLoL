import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  @Output() successful = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    this.authService.login(form.value.email, form.value.password)
      .subscribe(
      () => {
        this.successful.emit();
      },
      () => {
        alert('Los datos son incorrectos!');
      }
      );
  }

}
