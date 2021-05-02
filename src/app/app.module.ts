import { AuthInterceptorSerrvice } from './auth/auth.interceptor';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http' ;

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { RecipeListItemComponent } from './recipe-book/recipe-list/recipe-list-item/recipe-list-item.component';
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { ToggleDropdownDirective } from './toggle-dropdown.directive';
import { RecipeSelectComponent } from './recipe-book/recipe-select/recipe-select.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeBookComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeListItemComponent,
    HeaderNavigationComponent,
    ToggleDropdownDirective,
    RecipeSelectComponent,
    RecipeEditComponent,
    AuthComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorSerrvice, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
