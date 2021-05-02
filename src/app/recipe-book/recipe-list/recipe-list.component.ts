import { RecipeService } from './../recipe-service.service';
import { Recipe } from './../recipe-model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit  {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recpList: Recipe[] = [] ;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {}


  ngOnInit() {
    this.recpList = this.recipeService.getAllRecipe();
    this.recipeService.recipeListChanged.subscribe(recipe => {
      this.recpList = recipe ;
    });
   }

  /*recipeWasClicked(recipeSelected: Recipe) {
    console.log(recipeSelected);
    this.recipeWasSelected.emit(recipeSelected);
  }*/

  onClickNewRecipe() {
    console.log(this.router);
    this.router.navigate(['edit'], {relativeTo: this.route});

  }

}
