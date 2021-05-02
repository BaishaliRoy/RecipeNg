import { Subject } from 'rxjs';
import { Ingredients } from './../Shared/Ingredients.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe-model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipeClicked = new EventEmitter<Recipe>();
  recipeListChanged = new Subject<Recipe[]>() ;
  // private recipeList: Recipe[] = [] ;
  private recipeList: Recipe[] = [
    new Recipe('Test Recipe 1', 'A new Recipe1',
     [
       new Ingredients('Meat', 1),
       new Ingredients('Wheat', 1),
       new Ingredients('Eggs', 12)
      ]),
    new Recipe('Test Recipe 2', 'A new Recipe2',
    [
      new Ingredients('Yoghurt', 1),
      new Ingredients('Semolina', 12),
      new Ingredients('Chocolate', 1)
     ]),
    new Recipe('Test Recipe 3', 'A new Recipe3', [
      new Ingredients('Yoghurt', 1),
      new Ingredients('Semolina', 12),
      new Ingredients('Chocolate', 1),
      new Ingredients('Meat', 1),
       new Ingredients('Wheat', 1),
       new Ingredients('Eggs', 12)
    ]),
  ];

  constructor() { }

  getAllRecipe() {
    console.log(this.recipeList);
    return this.recipeList ;
  }

  getRecipeById(id: number) {
    return this.recipeList[id];
  }

  addRecipe(newRecipe: Recipe) {
    this.recipeList.push(newRecipe);
    console.log(this.recipeList);

  }

  updateRecipe(id: number, changedRecipe: Recipe) {
    this.recipeList[id] = changedRecipe ;
    console.log(this.recipeList);

  }

  updateRecipeList(recipe: Recipe []) {
    this.recipeList = recipe ;
    console.log(this.recipeList);
    this.recipeListChanged.next(this.recipeList);

  }
}
