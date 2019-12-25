import {Component, Input, OnInit} from '@angular/core';
import {Personnel} from '../../shared/model/personnel.model';

@Component({
    selector: 'app-personnel-item',
    templateUrl: './personnel-item.component.html',
    styleUrls: ['./personnel-item.component.scss']
})
export class PersonnelItemComponent implements OnInit {
    @Input() personnel: Personnel;

    constructor() {
    }

    ngOnInit() {
    }

}
