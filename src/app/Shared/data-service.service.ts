import { AuthenticationService } from '../auth/authentication.service';
import { RecipeService } from './../recipe-book/recipe-service.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipe-book/recipe-model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  token: string;

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthenticationService) { }

  saveDataToServer () {
    const recipeList = this.recipeService.getAllRecipe();
    this.http.put('https://ng-project-recipe-d5743-default-rtdb.firebaseio.com/recipeList.json',
      recipeList).subscribe(response => {
        console.log(response) ;
      });
  }

  fetchDataFromServer () {
    this.http.get<Recipe[]>('https://ng-project-recipe-d5743-default-rtdb.firebaseio.com/recipeList.json')
    .subscribe(recipe => {
      this.recipeService.updateRecipeList(recipe) ;
    });
  }
}
//   fetchDataFromServer () {
//     this.authService.currUser.pipe(take(1)).subscribe(user => {
//       this.token = user.token ;
//     });
//     this.http.get<Recipe[]>('https://ng-project-recipe-d5743-default-rtdb.firebaseio.com/recipeList.json',
//       {
//       params: new HttpParams().set('auth', this.token)
//       })
//     .subscribe(recipe => {
//       this.recipeService.updateRecipeList(recipe) ;
//     });
//   }
// }
