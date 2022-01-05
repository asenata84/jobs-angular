import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { title } from '../../validators/title.validator';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();

    this.route.params.pipe(
      switchMap((params) => {
        const id = params.id;

        if (id) {
          return this.booksService.getBook$(id);
        }

        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.buildForm(response);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const book = this.formGroup.value as Book;

    let request$;

    if (!book.id) {
      request$ = this.booksService.postBook$(book);
    } else {
      request$ = this.booksService.putBook$(book);
    }

    request$.subscribe({
      next: () => {
        this.router.navigate(['/main', 'books']);
      }
    });
  }

  private buildForm(book?: Book): void {
    this.formGroup = this.fb.group({
      id: book?.id,
      title: [book?.title || '', [Validators.required, title()]],
      description: [book?.description || ''],
      author: [book?.author || '', [Validators.required]]
    });
  }
}
