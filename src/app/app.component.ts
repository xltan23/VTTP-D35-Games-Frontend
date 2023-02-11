import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BGGService } from './bgg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy{
  title = 'client';

  // VARIABLES
  searchTerms = ""
  sub$!:Subscription

  // CONSTRUCTOR
  constructor(private bggSvc:BGGService) {}

  // ON INITIALIZATION
  ngOnInit(): void {
      // Subscribe to event (From bggSvc)
      this.sub$ = this.bggSvc.onSearchQuery.subscribe(
        (name:string) => {
          // Pass the name string from event to be displayed in app.component
          this.searchTerms = name
        }
      )
  }

  // ON TERMINATION
  ngOnDestroy(): void {
      this.sub$.unsubscribe()
  }

  ngAfterViewInit(): void {
      
  }
}
