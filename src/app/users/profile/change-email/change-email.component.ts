import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  @Output() successful = new EventEmitter();

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    if (form.value.email === form.value.emailConfirmation) {
      this.usersService.changeEmail(form.value.email)
      .subscribe(
        (user) => {
          alert('El correo se actualizó correctamente');
          this.successful.emit(user);
          form.reset();
        },
        (responseError) => {
          alert(responseError.error.msg);
        }
      );
    } else {
      alert('Los correos no coinciden!');
    }
  }

}
