import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <h1 class="home"><a routerLink>New UX architecture prototype</a></h1>
        <router-outlet></router-outlet>`
})
export class AppComponent {
    title = 'prototype';
}
