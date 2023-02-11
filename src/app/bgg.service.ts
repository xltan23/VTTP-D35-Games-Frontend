import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Subject } from "rxjs";
import { Game } from "./models";

const BACKEND = 'http://localhost:8080'

@Injectable()
export class BGGService {

    // EVENTS
    onSearchQuery = new Subject<string>()
    onSearchResults = new Subject<Game[]>()

    // CONSTRUCTOR
    constructor(private http:HttpClient) {}

    searchGameByName(name:string):Promise<Game[]> {
        // Push name string to app.component
        this.onSearchQuery.next(name)
        // Set up params: ?name={name}
        const params = new HttpParams().set("name", name)
        // Send GET request to http://localhost:8080/api/games?name={name}
        return firstValueFrom(this.http.get<Game[]>(`${BACKEND}/api/games`, { params }))
                .then(results => {
                    // Push Game array to app.component
                    this.onSearchResults.next(results)
                    return results
                })
    }
}