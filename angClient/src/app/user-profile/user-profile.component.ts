import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from "../shared/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  userDetails;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        // res['user'] is fetched from nodejs server userprofile api
        this.userDetails = res['user'];
      },
      err => {}
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
