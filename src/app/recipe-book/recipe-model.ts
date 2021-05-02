import { Ingredients } from './../Shared/Ingredients.model';
export class Recipe {
    public title: string ;
    public description: string ;
    public ingredients: Ingredients[];

    constructor(title: string, desc: string, ingr: Ingredients[]) {
        this.title = title;
        this.description = desc;
        this.ingredients = ingr;
    }
}
