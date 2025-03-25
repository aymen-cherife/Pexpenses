import { Component, ViewChild, OnInit } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { TransactionService } from '@services/transaction.service';
import { FormsModule } from '@angular/forms'; // added this line too for binding models with inputs in forms.

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  category: string;
  description?: string;
  tags?: string[];
  user: string;
}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, AgGridModule, FormsModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  @ViewChild('agGrid') agGrid: any;
  private gridApi!: GridApi;

  columnDefs: ColDef[] = [
    { field: 'amount', headerName: 'Amount', editable: true },
    { field: 'date', headerName: 'Date', editable: true },
    { field: 'category', headerName: 'Category', editable: true },
    { field: 'description', headerName: 'Description', editable: true },
    { field: 'tags', headerName: 'Tags', editable: true }
  ];

  rowData: Transaction[] = [];
  filteredRowData = [...this.rowData];
  dateRange = { start: '', end: '' };
  amountRange = { min: 0, max: Number.MAX_VALUE };

  newTransaction: Partial<Transaction> = {
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    tags: [],
  };

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.fetchTransactions();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  fetchTransactions() {
    this.transactionService.getTransactions().subscribe((data: Transaction[]) => {
      this.rowData = data;
      this.applyFilters();
    },
      error => {
        console.error('Error:', error);
      }
    );
  }

  deleteRow() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const selectedData = selectedNodes[0].data;
      this.transactionService.deleteTransaction(selectedData._id).subscribe(() => {
        this.rowData = this.rowData.filter(row => row._id !== selectedData._id);
        this.applyFilters();
      });
    }
  }

  submitNewTransaction() {
    const userId = localStorage.getItem('userId'); // Adjust based on how user ID is stored

    const tags = this.newTransaction.tags as string | string[] | undefined;
    const tagsArray: string[] = tags ? (typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags) : [];

    const newItem: Transaction = {
      _id: '', // The backend will generate this
      amount: this.newTransaction.amount!,
      date: this.newTransaction.date!,
      category: this.newTransaction.category!,
      description: this.newTransaction.description!,
      tags: tagsArray,
      user: userId || 'non_specified' // Ensure user ID is correctly set
    };

    this.transactionService.addTransaction(newItem).subscribe(
      (data: Transaction) => {
        this.rowData.push(data);
        this.applyFilters();
        this.resetNewTransactionForm();
      },
      error => {
        console.error('Error adding transaction:', error);
      }
    );
  }

  resetNewTransactionForm() {
    this.newTransaction = {
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      category: '',
      description: '',
      tags: [],
    };
  }

  onCellValueChanged(event: any) {
    const data = { ...event.data };

    if (typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map((tag: string) => tag.trim());
    } else if (Array.isArray(data.tags)) {
      data.tags = data.tags.map((tag: string) => tag.trim());
    } else {
      data.tags = [];
    }

    this.transactionService.updateTransaction(data._id, data).subscribe(
      () => {
        this.applyFilters();
      },
      error => {
        console.error('Error updating transaction:', error);
      }
    );
  }

  onFilterTextBoxChanged(event: any) {
    this.gridApi.setQuickFilter(event.target.value);
  }

  onDateRangeChanged(event: any, type: 'start' | 'end') {
    this.dateRange[type] = event.target.value;
    this.applyFilters();
  }

  onAmountRangeChanged(event: any, type: 'min' | 'max') {
    this.amountRange[type] = event.target.value ? parseFloat(event.target.value) : (type === 'min' ? 0 : Number.MAX_VALUE);
    this.applyFilters();
  }

  applyFilters() {
    this.filteredRowData = this.rowData.filter(row => {
      const withinDateRange = (!this.dateRange.start || new Date(row.date) >= new Date(this.dateRange.start)) &&
        (!this.dateRange.end || new Date(row.date) <= new Date(this.dateRange.end));
      const withinAmountRange = row.amount >= this.amountRange.min && row.amount <= this.amountRange.max;
      return withinDateRange && withinAmountRange;
    });
    this.gridApi.setRowData(this.filteredRowData);
  }
}
