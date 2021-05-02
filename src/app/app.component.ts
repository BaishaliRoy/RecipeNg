import { AuthenticationService } from './auth/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project';

  constructor( private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
  // option: string;

  // onNavSelected(select: string) {
  //   console.log(select);
  //   this.option = select;
  // }
}
