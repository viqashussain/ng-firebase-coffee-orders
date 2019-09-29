import { Component, OnInit } from '@angular/core';
import { CoffeeService } from 'src/app/shared/coffee.service';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-coffee-types',
  templateUrl: './coffee-types.component.html',
  styleUrls: ['./coffee-types.component.scss']
})
export class CoffeeTypesComponent implements OnInit {

  constructor(private coffeeTypesService: CoffeeService) { }

  coffeeTypes$: Observable<any>;
  displayedColumns: string[] = ['name'];

  ngOnInit() {
    this.coffeeTypes$ = this.coffeeTypesService.getCoffees().pipe(
      map(x => x.map(x => x.payload.doc as any))
    );
  }

}
