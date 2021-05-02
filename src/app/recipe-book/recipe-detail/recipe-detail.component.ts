import { RecipeService } from './../recipe-service.service';
import { Recipe } from './../recipe-model';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingService } from 'src/app/shopping-list/shopping-service.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
/*@Input()recipeRecvd: Recipe;*/
recipeRecvd: Recipe;
id: number;
  constructor(private shopService: ShoppingService,
              private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.recipeRecvd = this.recipeService.getRecipeById(this.id);
    console.log(this.recipeRecvd);

    this.route.params
    .subscribe((params: Params) => {
      console.log(params);
      this.id = params['id'];
      this.recipeRecvd = this.recipeService.getRecipeById(this.id);
    });
  }

  addToShoppingList() {
    // tslint:disable-next-line:forin
    for (const key in this.recipeRecvd.ingredients) {
      this.shopService.addIngredient(this.recipeRecvd.ingredients[key]);
    }
  }

}
