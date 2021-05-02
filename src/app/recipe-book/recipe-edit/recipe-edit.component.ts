import { RecipeService } from './../recipe-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editRecipeForm: FormGroup;
  selectedItemId: number ;
  editMode: Boolean = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit() {
    // this.selectedItemId = this.route.snapshot.params['id'];
    // console.log(this.route.snapshot);
    // console.log(this.selectedItemId);
    if (this.route.snapshot.params['id']) {
      this.selectedItemId = this.route.snapshot.params['id'];
      this.editMode = true;
    }
    let title = '';
    let desc = '';
    const ingredientsArr = new FormArray([]);

    if (this.editMode) {
      const selectedRecipe = this.recipeService.getRecipeById(this.selectedItemId);
      title = selectedRecipe.title;
      desc = selectedRecipe.description;
      if (selectedRecipe['ingredients']) {
        for (const ingredient of selectedRecipe.ingredients) {
          ingredientsArr.push( new FormGroup({
              'name' : new FormControl(ingredient.name),
              'amount' : new FormControl(ingredient.amount)
          }));
        }

      }
    }
    this.editRecipeForm = new FormGroup({
      'title' :  new FormControl(title),
      'url' :  new FormControl(),
      'description' :  new FormControl(desc),
      'ingredients' :  ingredientsArr
    });

    console.log(this.editMode);
  }
  onSubmit() {
    console.log(this.editRecipeForm.value);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.selectedItemId, this.editRecipeForm.value) ;

    } else {
      this.recipeService.addRecipe(this.editRecipeForm.value);
    }
    this.router.navigate(['Recipe']);
  }
  addNewIngredient() {
    console.log((<FormArray>this.editRecipeForm.get('ingredients')).controls) ;
    (<FormArray>this.editRecipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(),
        'amount' : new FormControl()
      }));
  }
}
