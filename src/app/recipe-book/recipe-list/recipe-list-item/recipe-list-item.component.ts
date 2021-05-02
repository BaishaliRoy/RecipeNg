import { Recipe } from './../../recipe-model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../../recipe-service.service';


@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onRecipeClicked() {
    this.recipeService.recipeClicked.emit(this.recipe);
  }

}
