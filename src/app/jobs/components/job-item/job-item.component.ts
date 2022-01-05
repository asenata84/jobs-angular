import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Job } from '../../models/job.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit {

  @Input() job: Job;

  @Output() deleteClicked = new EventEmitter<number>();

  hasPermissions: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions('admin');
  }

  onDelete(): void {
    this.deleteClicked.emit(this.job.id);
  }
}
