import { AuthComponent } from './../auth/auth.component';
import { RecipeEditComponent } from './../recipe-book/recipe-edit/recipe-edit.component';
import { RecipeSelectComponent } from './../recipe-book/recipe-select/recipe-select.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { RecipeBookComponent } from './../recipe-book/recipe-book.component';
import { ShoppingListComponent } from './../shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './../recipe-book/recipe-detail/recipe-detail.component';


const routes: Routes = [
  {path: '', redirectTo: '/Recipe', pathMatch: 'full'},
  {path: 'Shopping', component: ShoppingListComponent},
  {path: 'Auth', component: AuthComponent},
  {path: 'Recipe', component: RecipeBookComponent, children: [
    {path: '',  component: RecipeSelectComponent},
    {path: 'edit',  component: RecipeEditComponent},
    {path: ':id',  component: RecipeDetailComponent},
    {path: ':id/edit',  component: RecipeEditComponent}
  ]},
];
// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

