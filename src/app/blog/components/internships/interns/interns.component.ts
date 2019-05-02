import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { INTERNS } from './interns-data';

@Component({
  selector: 'app-interns',
  templateUrl: './interns.component.html',
  styleUrls: ['./interns.component.css']
})
export class InternsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'internship', 'completed'];
  dataSource = new MatTableDataSource(INTERNS);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() {}

  ngOnInit() {}
}
