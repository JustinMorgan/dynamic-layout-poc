import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'alerts-grid-header',
  template: `
    <div class="grid-header row">
        <div class="cell">Alert ID</div>
        <div class="cell">Alert Name</div>
    </div>
  `
})
export class AlertsGridHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
