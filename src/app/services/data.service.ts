import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Transaction } from '../models/transaction';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  user: any;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.fireAuth.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }

  async addTransaction(transaction: Transaction) {
    if (this.user) {
      const userId = this.user.uid;

      const userDocRef = this.firestore
        .collection('transactions')
        .doc(userId)
        .collection('user_transactions');

      const customId = uuidv4();

      const transactionWithId = { ...transaction, id: customId };

      userDocRef
        .doc(customId)
        .set(transactionWithId)
        .then(() => {
          console.log('Transaction added with custom ID: ', customId);
        })
        .catch((error) => {
          console.error('Error adding transaction: ', error);
        });
    }
  }

  getTransactions() {
    if (this.user) {
      return this.firestore
        .collection('transactions')
        .doc(this.user.uid)
        .valueChanges();
    }
    return null;
  }

  async deleteTransaction(transactionId: string) {
    if (this.user) {
      const userId = this.user.uid;

      const transactionDocRef = this.firestore
        .collection('transactions')
        .doc(userId)
        .collection('user_transactions')
        .doc(transactionId);

      try {
        await transactionDocRef.delete();
      } catch (error) {
        console.error('Error deleting transaction: ', error);
      }
    }
  }

  async getSumOfSalaryTransactions() {
    if (this.user) {
      const userId = this.user.uid;

      const userTransactionsRef = this.firestore
        .collection('transactions')
        .doc(userId)
        .collection('user_transactions');

      try {
        // Fetch all transactions for the user
        const snapshot = await userTransactionsRef.get().toPromise();

        // Initialize a variable to store the sum of salary transactions
        let sumOfSalaryTransactions = 0;

        // Process each transaction and calculate the sum
        if (snapshot) {
          snapshot.forEach((doc) => {
            const transaction = doc.data();
            if (transaction['category'] === 'salary') {
              sumOfSalaryTransactions += Number(transaction['amount']);
            }
          });
        }

        return sumOfSalaryTransactions;
      } catch (error) {
        // Handle the error here
        console.error('Error fetching salary transactions:', error);
        return 0; // Assuming a default value of 0 for sum
      }
    }

    // Return a default value if the user is not authenticated or in other error cases
    return 0; // Assuming a default value of 0 for sum
  }

  async getSumOfAllCategories() {
    if (this.user) {
      const userId = this.user.uid;

      const userTransactionsRef = this.firestore
        .collection('transactions')
        .doc(userId)
        .collection('user_transactions');

      try {
        // Fetch all transactions for the user
        const snapshot = await userTransactionsRef.get().toPromise();

        // Initialize an object to store the sums for each category
        const categorySums: { [key: string]: number } = {};

        // Process each transaction and calculate the sums for each category
        if (snapshot) {
          snapshot.forEach((doc) => {
            const transaction = doc.data();
            const category = transaction['category'];
            const amount = Number(transaction['amount']);

            if (category in categorySums) {
              categorySums[category] += amount;
            } else {
              categorySums[category] = amount;
            }
          });
        }

        return categorySums;
      } catch (error) {
        // Handle the error here
        console.error('Error fetching category transactions:', error);
        return {}; // Assuming an empty object as a default value for category sums
      }
    }

    // Return a default value if the user is not authenticated or in other error cases
    return {}; // Assuming an empty object as a default value for category sums
  }
}
