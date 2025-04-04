import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() current: number;
  @Input() total: number;

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  public pages: number[] = [];

  public onGoTo(page: number): void {
    this.goTo.emit(page);
  }
  public onNext(): void {
    this.next.emit(this.current);
  }
  public onPrevious(): void {
    this.previous.next(this.current);
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 7) {
      return [...Array(7).keys()].map((x) => ++x);
    } else if (current >= 5) {
      if (current > total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    } else {
      return [1, 2, 3, 4, 5, -1, total];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['current'] && changes['current']['currentValue']) ||
      (changes['total'] && changes['total']['currentValue'])
    ) {
      this.pages = this.getPages(this.current, this.total);
    }
  }
}
