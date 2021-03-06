import { RecipeService } from './recipe-service.service';
import { Recipe } from './recipe-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.recipeClicked
    .subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe ;
    });
  }

  /*onRecipeSelect(recipe: Recipe) {
    console.log(recipe);
    this.selectedRecipe = recipe;
    console.log(this.selectedRecipe) ;
  }*/

}
