import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // Caminho base da API para categorias
  private apiPath = 'api/categories';

  constructor(private http: HttpClient) {}

  /**
   * Retorna todas as categorias da API.
   */
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiPath).pipe(
      map(this.jsonDataToCategories),
      catchError(this.handleError)
    );
  }

  /**
   * Retorna uma categoria pelo seu ID.
   * @param id Identificador da categoria
   */
  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get<Category>(url).pipe(
      map(this.jsonDataToCategory),
      catchError(this.handleError)
    );
  }

  /**
   * Cria uma nova categoria na API.
   * @param category Objeto da categoria a ser criada
   */
  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiPath, category).pipe(
      map(this.jsonDataToCategory),
      catchError(this.handleError)
    );
  }

  /**
   * Atualiza uma categoria existente na API.
   * @param category Objeto da categoria a ser atualizada
   */
  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;
    return this.http.put<Category>(url, category).pipe(
      map(() => category),
      catchError(this.handleError)
    );
  }

  /**
   * Remove uma categoria da API pelo ID.
   * @param id Identificador da categoria a ser removida
   */
  delete(id: number): Observable<null> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete<null>(url).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  /**
   * Converte um array de dados JSON em um array de objetos Category.
   * @param jsonData Array de dados JSON
   */
  private jsonDataToCategories(jsonData: any[]): Category[] {
    return jsonData.map(element => element as Category);
  }

  /**
   * Converte um dado JSON em um objeto Category.
   * @param jsonData Dado JSON
   */
  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }

  /**
   * Trata erros de requisições HTTP.
   * @param error Objeto de erro retornado pela requisição
   */
  private handleError(error: any): Observable<any> {
    console.error('Erro na requisição =>', error);
    return throwError(() => error);
  }
}