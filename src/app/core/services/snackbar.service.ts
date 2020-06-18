import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action?: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ["kriger-snackbar"];
    config.duration = 2000;
    this.snackBar.open(message, action, config);
  }

  openErrorBar(message: string, action?: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ["kriger-snackbar-error"];
    config.duration = 2000;
    this.snackBar.open(message, action, config);
  }
}
