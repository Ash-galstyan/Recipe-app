import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Pizza',
  //     'Pepperoni Pizza',
  //     'https://cdn.pixabay.com/photo/2020/02/04/12/14/pepperoni-4818019_960_720.jpg',
  //     [
  //       new Ingredient('Pepperoni', 20),
  //       new Ingredient('Cheese', 10),
  //       new Ingredient('Tomatoes', 2),
  //       new Ingredient('Dough', 1),
  //       new Ingredient('Sauce', 1),
  //     ]
  //   ),
  //   new Recipe('Pizza',
  //     'Superhero Pizza',
  //     'https://i.pinimg.com/originals/ce/ab/10/ceab10837057e7a1b61680690e56bc86.jpg',
  //     [
  //       new Ingredient('Pepperoni', 20),
  //       new Ingredient('Ham', 15),
  //       new Ingredient('Olives', 10),
  //       new Ingredient('Cheese', 10),
  //       new Ingredient('Tomatoes', 3),
  //       new Ingredient('Dough', 1),
  //       new Ingredient('Sauce', 1),
  //     ]
  //     )
  // ];
  private recipes: Recipe[] = [];

  constructor(private sLService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    if (recipes) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.sLService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
