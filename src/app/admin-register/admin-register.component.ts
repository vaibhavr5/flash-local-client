import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  constructor(private router: Router,
              private service: UserServiceClient) { }


  username;
  password;
  password2;
  register(username, password, password2) {
    if (password !== this.password2) {
      alert("Password mismatch. Type the correct password");
      return;
    }
    this.service
      .findUsername(username)
      .then((usrname) => {
        if (usrname !== null) {
          alert("Username already exists");
        }
        else {
          this.service
            .createUserByAdmin(username, password)
            .then(() =>
              this.router.navigate(['user-admin']));
        }
      });
  }


  ngOnInit() {
  }

}
