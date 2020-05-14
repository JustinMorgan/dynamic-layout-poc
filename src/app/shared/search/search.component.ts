import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    @Input() searchText = '';

    searchChanging = new Subject<string>();
    @Output() searchTextChanged = this.searchChanging.pipe(debounceTime(500));

    constructor() { }

    ngOnInit() {
        this.search();
    }

    search() {
        this.searchChanging.next(this.searchText);
    }

}
