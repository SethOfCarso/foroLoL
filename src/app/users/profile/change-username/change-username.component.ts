import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss']
})
export class ChangeUsernameComponent implements OnInit {

  constructor(private usersService: UsersService) { }
  @Output() successful = new EventEmitter();

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    this.usersService.changeUsername(form.value.username)
    .subscribe(
      (user) => {
        alert('Su nombre de usuario fue cambiado correctamente');
        this.successful.emit(user);
        form.reset();
      },
      (responseError) => {
        alert(responseError.error.msg);
      }
    );
  }
}
