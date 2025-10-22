import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    // Lista de categorias simuladas
    const categories: Category[] = [
      { id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa' },
      { id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios' },
      { id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc' },
      { id: 4, name: 'Salário', description: 'Recebimento de Salário' },
      { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer' }
    ];

    // Retorne o objeto com as coleções que deseja simular
    return { categories };
  }
}