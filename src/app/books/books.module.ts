import { NgModule } from '@angular/core';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BooksComponent } from './components/books/books.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BooksRoutingModule } from './books-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BooksRoutingModule
  ],
  declarations: [
    BooksListComponent,
    BookItemComponent,
    BookFormComponent,
    BooksComponent
  ]
})
export class BooksModule {
}
