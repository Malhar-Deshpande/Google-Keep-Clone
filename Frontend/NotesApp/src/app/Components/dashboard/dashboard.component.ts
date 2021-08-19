import { HostListener, Input } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showFiller = false;
  @ViewChild('drawer') drawer!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  hover() {
    this.drawer.nativeElement.style
  }
}
