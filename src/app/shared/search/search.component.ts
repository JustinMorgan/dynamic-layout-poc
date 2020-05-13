import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    @Input() searchText: string = '';

    searchChanging = new Subject<string>();
    @Output() searchTextChanged = this.searchChanging.pipe(debounceTime(500));

    constructor() { }

    ngOnInit() {
        this.search();
    }

    search() {
        this.searchChanging.next(this.searchText)
    }

}
