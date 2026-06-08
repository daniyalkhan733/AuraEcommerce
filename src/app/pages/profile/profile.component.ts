import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5 mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div class="card-header bg-primary text-white p-5 text-center">
              <img [src]="user?.avatar" class="rounded-circle border border-4 border-white shadow-sm mb-3" style="width: 120px; height: 120px; object-fit: cover;">
              <h2 class="fw-bold mb-1">{{ user?.name }}</h2>
              <p class="mb-0 text-white-50">{{ user?.email }}</p>
            </div>
            
            <div class="card-body p-4">
              <div class="row g-4">
                <div class="col-md-6">
                  <div class="p-4 bg-light rounded-3 h-100">
                    <h6 class="text-muted text-uppercase small fw-bold mb-3">Account Information</h6>
                    <div class="mb-2 d-flex justify-content-between">
                      <span class="text-muted">Username:</span>
                      <span class="fw-medium text-dark">{{ user?.name }}</span>
                    </div>
                    <div class="mb-2 d-flex justify-content-between">
                      <span class="text-muted">Email:</span>
                      <span class="fw-medium text-dark">{{ user?.email }}</span>
                    </div>
                    <div class="mb-2 d-flex justify-content-between">
                      <span class="text-muted">Membership:</span>
                      <span class="badge bg-primary rounded-pill">Premium Client</span>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="p-4 bg-light rounded-3 h-100">
                    <h6 class="text-muted text-uppercase small fw-bold mb-3">Security & Settings</h6>
                    <button class="btn btn-outline-dark btn-sm w-100 mb-2 rounded-pill">Update Password</button>
                    <button class="btn btn-outline-dark btn-sm w-100 mb-2 rounded-pill">Manage Addresses</button>
                    <button (click)="logout()" class="btn btn-danger btn-sm w-100 rounded-pill mt-2">Log Out</button>
                  </div>
                </div>
              </div>

              <div class="mt-4 p-4 border rounded-3 bg-white">
                <h6 class="text-muted text-uppercase small fw-bold mb-3">Recent Activity</h6>
                <div class="text-center py-4">
                  <i class="bi bi-clock-history fs-1 text-muted opacity-25 mb-2 d-block"></i>
                  <p class="text-muted mb-0 small">No recent activity detected.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card-header {
      background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
