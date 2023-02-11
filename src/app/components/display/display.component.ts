import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BGGService } from 'src/app/bgg.service';
import { Game } from 'src/app/models';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy{
  
  games:Game[] = []

  sub$!:Subscription

  // CONSTRUCTOR
  constructor(private bggSvc:BGGService) {}

  // ON INITIALIZATION
  ngOnInit(): void {
      // Subscribe to event (From bggSvc)
      this.sub$ = this.bggSvc.onSearchResults.subscribe(
        games => {
          // Pass the results to array in display component 
          this.games = games
        }
      )
  }

  // ON TERMINATION
  ngOnDestroy(): void {
      this.sub$.unsubscribe()
  }
}
