import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  isSidebarActive = false;

  isExpense = false;
  category = '';

  toggleIncomeExpense(value: boolean) {
    value ? (this.isExpense = true) : (this.isExpense = false);
  }

  showSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  transObj: Transaction = {
    id: '',
    isExpense: false,
    title: '',
    amount: '',
    category: '',
    date: '',
  };

  transactionsForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    category: ['', Validators.required],
    date: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  user: any;
  transactions: Transaction[] = [];

  ngOnInit() {
    this.fireAuth.authState.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.loadUserTransactions();
      }
    });
  }

  async loadUserTransactions() {
    if (this.user) {
      this.firestore
        .collection('transactions')
        .doc(this.user.uid)
        .collection('user_transactions')
        .valueChanges()
        .subscribe((data: any) => {
          this.transactions = data;
          // console.log(data);
        });
    }
  }

  addTransaction() {
    if (this.transactionsForm.valid) {
      this.transObj.title = this.transactionsForm.value.title!;
      this.transObj.amount = this.transactionsForm.value.amount!;
      this.transObj.isExpense = this.isExpense;
      this.transObj.category = this.transactionsForm.value.category!;
      this.transObj.date = this.transactionsForm.value.date!;

      this.data.addTransaction(this.transObj);
    }
  }

  deleteTransaction(transactionId: string) {
    this.data
      .deleteTransaction(transactionId)
      .then(() => {
        console.log('Transaction deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting transaction: ', error);
      });
  }
}
