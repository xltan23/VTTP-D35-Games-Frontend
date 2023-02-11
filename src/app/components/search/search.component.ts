import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BGGService } from 'src/app/bgg.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // VARIABLES
  searchForm!:FormGroup

  // CONSTRUCTOR
  constructor(private fb:FormBuilder, private bggSvc:BGGService) {}

  // ON INITIALIZATION
  ngOnInit(): void {
    // Create form
     this.searchForm = this.fb.group({
      name:this.fb.control('',[Validators.required])
     }) 
  }

  // ON SUBMIT
  doSearch() {
    const name = this.searchForm.get('name')?.value
    console.info('>>> Name: ', name)
    // Using service pushes name and the results to app.component
    this.bggSvc.searchGameByName(name)
                .then(result => {
                  console.info('>>> Games: ', result)
                  this.searchForm.reset()
                })
                .catch(error => {
                  console.error('>>> Error: ', error)
                })
  }
}
