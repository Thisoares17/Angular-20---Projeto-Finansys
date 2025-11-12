import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing-module';
import { CategoryListComponent } from './category-list/category-list';
import { CategoryFormComponent } from './category-form/category-form';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    CategoryListComponent,
    CategoryFormComponent,
    RouterModule
  ]
})
export class CategoriesModule { }