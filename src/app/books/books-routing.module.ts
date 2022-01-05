import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { AclGuard } from '../guards/acl.guard';

const routes: Route[] = [
  {
    path: '',
    component: BooksComponent,
    children: [
      {
        path: 'books',
        component: BooksListComponent
      },
      {
        path: 'books/edit',
        component: BookFormComponent,
        canActivate: [AclGuard]
      },
      {
        path: 'books/edit/:id',
        component: BookFormComponent,
        canActivate: [AclGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'books'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BooksRoutingModule {
}
