import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimestampService {

  constructor() { }

  get timestamp() {
    const date = new Date();
    const yyyy = date.getFullYear().toString();
    const month = date.getMonth() + 1;
    const mm = this.concatZero(month);
    const d = date.getDate();
    const dd = this.concatZero(d);
    const h = date.getHours();
    const hh = this.concatZero(h);
    const minutes = date.getMinutes();
    const mmm = this.concatZero(minutes);
    const s = date.getSeconds();
    const ss = this.concatZero(s)

    return `${yyyy+mm+dd+hh+mmm+ss}`;
  }

  concatZero = n => n < 10 ? '0' + n: n;
}
