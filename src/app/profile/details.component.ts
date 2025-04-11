import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { Account } from '@app/_models';

@Component({
    templateUrl: 'details.component.html',
    standalone: false
})
export class DetailsComponent implements OnInit {
    account!: Account;

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.accountService.account.subscribe(account => this.account = account!);
    }
}