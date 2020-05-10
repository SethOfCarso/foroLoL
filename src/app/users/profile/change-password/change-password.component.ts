import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @Output() successful = new EventEmitter();

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    if (form.value.password === form.value.passwordConfirmation) {
      this.usersService.changePassword(form.value.password)
      .subscribe(
        (user) => {
          alert('Su contraseña fue cambiada exitosamente, la próxima vez que inicie sesión use la nueva contraseña.');
          this.successful.emit(user);
          form.reset();
        },
        (responseError) => {
          alert(responseError.error.msg);
        }
      );
    } else {
      alert('Las contraseñas no coinciden!');
    }
  }

}
