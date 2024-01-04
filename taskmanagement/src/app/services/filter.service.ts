
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterSubject = new BehaviorSubject<string>('');

  getFilter() {
    return this.filterSubject.asObservable();
  }

  setFilter(filter: string) {
    this.filterSubject.next(filter);
  }
}
