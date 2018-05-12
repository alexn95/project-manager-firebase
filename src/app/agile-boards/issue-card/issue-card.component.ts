import { Component, OnInit, Input } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
import { Issue } from '../../../models/entries/issue';

@Component({
    selector: 'app-issue-card',
    templateUrl: './issue-card.component.html'
})
export class IssueCardComponent implements OnInit {

    @Input() issue: Issue;

    constructor() {
    }

    ngOnInit() {

    }


}
