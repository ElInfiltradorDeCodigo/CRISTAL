import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.page.html',
  styleUrls: ['./acerca.page.scss'],
})
export class AcercaPage implements OnInit {

  private isAccordionExpanded = false;

  constructor() {}

  toggleAccordion() {
    this.isAccordionExpanded = !this.isAccordionExpanded;
  }

  isAccordionOpen() {
    return this.isAccordionExpanded;
  }

  ngOnInit() {
  }

}
