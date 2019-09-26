import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { RegistrationModel } from 'src/app/domain/models/registration-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  model: RegistrationModel = new RegistrationModel();

  ngOnInit() {
  }

  register()
  {
    this.authService.register(this.model);
  }

}
