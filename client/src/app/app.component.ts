import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { AccountService } from './core/services/account.service';
import { AdComponent } from "./layout/ad/ad.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, AdComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public accountService = inject(AccountService);
  
  ngOnInit(): void {
    this.accountService.getUserInfo(); 
  }
}
