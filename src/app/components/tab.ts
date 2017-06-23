import { Component, Input } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: '../templates/tab.html',
  styleUrls: ['../styles/tab.css']
})
export class Tab {
  /* This code sample was borrowed from Thoughtram. Credit goes to him.
   *
   */
  @Input('tabTitle') title: string;
  @Input() active = false;
}