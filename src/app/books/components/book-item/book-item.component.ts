import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../models/book.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {

  @Input() book: Book;

  @Output() deleteClicked = new EventEmitter<number>();

  hasPermissions: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions('admin');
  }

  onDelete(): void {
    this.deleteClicked.emit(this.book.id);
  }
}
