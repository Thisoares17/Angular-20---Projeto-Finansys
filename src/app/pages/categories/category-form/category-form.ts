import { CommonModule } from '@angular/common';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category';
import { switchMap } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-category-form',
  templateUrl: './category-form.html',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['./category-form.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string = '';
  categoryForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessages!: string[] | null;
  submittingForm: boolean = false;
  category: Category = new Category();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
    this.setPageTitle();
  }

  ngAfterContentChecked() {

    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction === 'new') {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }



  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new')
      this.currentAction = 'new';
    else
      this.currentAction = 'edit';
  }
  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [""],
      name: ["", [Validators.required, Validators.minLength(2)]],
      description: [null],
    })
  }
  private loadCategory() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(Number(params.get('id'))))
      )
        .subscribe({
          next: (category) => {
            this.category = category;
            this.categoryForm.patchValue(category);
          },
          error: (error) => {
            alert('Ocorreu um erro no servidor, tente novamente mais tarde.');
          }
        });
    }
  }
  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Nova Categoria';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editando Categoria: ' + categoryName;
    }
  }
  public createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category).subscribe({
      next: (category) => this.actionsForSuccess(category),
      error: (error) => this.actionsForError(error)
    });
  }

  private updateCategory() {

  }
  private actionsForSuccess(category: Category) {
    alert('Solicitação processada com sucesso!');

    this.router.navigate(['categories'], { skipLocationChange: true }).then(() => {
      this.router.navigate(['categories', category.id, 'edit']);
    });
  }

  private actionsForError(error: any) {
    alert('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
    }

  }

}
