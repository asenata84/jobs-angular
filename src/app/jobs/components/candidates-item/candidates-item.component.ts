import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Candidate } from '../../../jobs/models/job.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-candidates-item',
  templateUrl: './candidates-item.component.html',
  styleUrls: ['./candidates-item.component.scss']
})
export class CandidatesItemComponent implements OnInit {

  @Input() candidate: Candidate;

  @Output() updateStatusClicked = new EventEmitter<{ id: number, status: string }>();

  hasPermissions: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions('organization');
  }

  onUpdateStatus(status: string): void {
    this.updateStatusClicked.emit({
      id: this.candidate?.id,
      status,
    });
  }
}
