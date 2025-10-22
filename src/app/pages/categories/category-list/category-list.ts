import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InMemoryDatabase } from '../../../in-memory-database';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css']
})
export class CategoryListComponent implements OnInit {

  categoriesList!: any[];

  
  constructor(private inMemoryDatabase: InMemoryDatabase) {}

  ngOnInit() {
    this.categoriesList = this.getCategories();
  }

  getCategories() {
    return this.inMemoryDatabase.createDb().categories;    
  }
alert(arg0: string) {
throw new Error('Method not implemented.');
}


  deleteCategory(category: any) {
    const confirmDelete = confirm('Deseja realmente excluir esta categoria?');
    if (confirmDelete) {
      this.categoriesList = this.categoriesList.filter(element => element !== category);
      alert('Categoria excluída com sucesso!');
    }
  }

}
