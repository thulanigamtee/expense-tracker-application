import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Transaction } from 'src/app/models/transaction';
import { map } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-summary',
  template: `
    <section class="summary">
      <div class="summary__content">
        <div class="summary__content__heading">
          <span>available balance</span>
        </div>
        <div class="summary__content__data">
          <span style="color: #2832c2" class="material-symbols-outlined">
            account_balance_wallet
          </span>
          <p style="color: #2832c2">R{{ balance }}</p>
        </div>
      </div>
      <div class="summary__content">
        <div class="summary__content__heading">
          <span>overall expenses</span>
        </div>
        <div class="summary__content__data">
          <span style="color: #b90e0a" class="material-symbols-outlined">
            trending_down
          </span>
          <p style="color: #b90e0a">R{{ totalExpense }}</p>
        </div>
      </div>
      <div class="summary__content">
        <div class="summary__content__heading">
          <span>overall income</span>
        </div>
        <div class="summary__content__data">
          <span style="color: #00703c" class="material-symbols-outlined">
            trending_up
          </span>
          <p style="color: #00703c">R{{ totalIncome }}</p>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  user: any;
  totalExpense: number = 0;
  totalIncome: number = 0;
  balance: number = this.totalIncome - this.totalExpense;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.calculateTotalExpense();
        this.calculateTotalIncome();
        this.calculateBalance();
      }
    });
  }

  calculateTotalExpense() {
    this.calculateTotalForCategory(true);
  }

  calculateTotalIncome() {
    this.calculateTotalForCategory(false);
  }

  calculateBalance() {
    this.balance = this.totalIncome - this.totalExpense;
  }

  calculateTotalForCategory(isExpense: boolean) {
    if (this.user) {
      const userId = this.user.uid;

      const userTransactionsRef = this.firestore
        .collection('transactions')
        .doc(userId)
        .collection('user_transactions');

      userTransactionsRef.valueChanges().subscribe((transactions: any[]) => {
        const filteredTransactions = transactions.filter(
          (transaction) => transaction.isExpense === isExpense
        );
        const total = filteredTransactions.reduce(
          (acc, transaction) => acc + Number(transaction.amount),
          0
        );

        if (isExpense) {
          this.totalExpense = total;
        } else {
          this.totalIncome = total;
        }

        // Recalculate the balance whenever the income or expenses change
        this.calculateBalance();
      });
    }
  }
}
