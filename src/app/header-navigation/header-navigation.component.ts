import { AuthenticationService } from '../auth/authentication.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataServiceService } from '../Shared/data-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.css']
})
export class HeaderNavigationComponent implements OnInit, OnDestroy {
//  @Output() navSelect =  new EventEmitter<string>();
userObs: Subscription ;
isAuthenticatedUser: Boolean = false;

  constructor(private dataService: DataServiceService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.userObs = this.authService.currUser.subscribe(user => {
      console.log(user);
      console.log(!!user);
      this.isAuthenticatedUser = !!user ;
    });
  }

  // onSelected(option: string) {
  //   console.log(option);
  //   this.navSelect.emit(option);
  // }

  onSave() {
    this.dataService.saveDataToServer() ;
  }

  onFetch () {
    this.dataService.fetchDataFromServer() ;
  }

  onlogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userObs.unsubscribe();
  }

  
}

