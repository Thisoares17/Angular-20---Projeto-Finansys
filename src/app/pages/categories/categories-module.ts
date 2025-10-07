import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing-module';
import { CategoryListComponent } from './category-list/category-list';
import { CategoryFormComponent } from './category-form/category-form';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    CategoryListComponent,
    CategoryFormComponent
  ]
})
export class CategoriesModule { }