import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://udemy-angular-course-8cd96-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(res => {
      console.log(res);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      // TODO adding the user token as a query parameter as this is the Firebase way, would normally do it in the headers
      'https://udemy-angular-course-8cd96-default-rtdb.firebaseio.com/recipes.json'
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap((recipes: any) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
