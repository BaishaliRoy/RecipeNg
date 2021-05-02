import { Ingredients } from './../../Shared/Ingredients.model';
import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShoppingService } from '../shopping-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') shoppingForm: NgForm;
  /* @ViewChild('ingName') nameIng: ElementRef;
    @ViewChild('ingAmount') amountIng: ElementRef; */
  /*@Output() newIngredientAdded = new EventEmitter<Ingredients>();*/
  ingrSubscription: Subscription ;
  isEditing: Boolean = false ;
  selectedIngredient: Ingredients;
  selectedIndex: number;



  constructor(private shopService: ShoppingService) { }

  ngOnInit() {
    this.ingrSubscription = this.shopService.ingredientSelected
    .subscribe((index: number) => {
      this.selectedIndex = index;
      this.selectedIngredient = this.shopService.getIngredientById(this.selectedIndex);
      console.log(this.selectedIngredient);
      this.isEditing = true ;
      this.shoppingForm.setValue(
      {
        IngAmount: this.selectedIngredient.amount,
        IngName: this.selectedIngredient.name
      });
    });

  }

  addIngredient() {
  /*  console.log(this.nameIng.nativeElement.value);
   this.shopService.addIngredient(new Ingredients(this.nameIng.nativeElement.value , this.amountIng.nativeElement.value)); */
   /*this.newIngredientAdded.emit(new Ingredients(this.nameIng.nativeElement.value , this.amountIng.nativeElement.value));*/

    console.log(this.shoppingForm);
    if (this.isEditing) {
      this.shopService.updateIngredient(new Ingredients(this.shoppingForm.value.IngName ,
        this.shoppingForm.value.IngAmount), this.selectedIndex);
      this.isEditing = false;
      this.shoppingForm.reset();

    } else {
      this.shopService.addIngredient(new Ingredients(this.shoppingForm.value.IngName ,
        this.shoppingForm.value.IngAmount));

    }
  }

  clearForm() {
    this.shoppingForm.reset();
    this.isEditing = false;
  }

  delete() {
    this.shopService.deleteIngredient(this.selectedIndex);
  }

  ngOnDestroy() {
    this.ingrSubscription.unsubscribe();
  }

}
