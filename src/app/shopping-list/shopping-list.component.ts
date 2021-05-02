import { Ingredients } from './../Shared/Ingredients.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingService } from './shopping-service.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredientList: Ingredients[] = [];
  constructor(private shopService: ShoppingService) { }

  ngOnInit() {
    this.ingredientList = this.shopService.getAllIngredients();
  }

  onItemSelect(index: number) {
    this.shopService.ingredientSelected.next(index);
  }



}
