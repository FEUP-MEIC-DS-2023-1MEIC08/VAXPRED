import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminPageService {

  constructor(private http: HttpClient) { }

  getAllPlugins(): Observable<any[]> {
    return this.http.get('http://localhost:8000/plugins/').pipe(
      map((response: any) => response.plugins)
    );
  }

  removePlugin(pluginID: number){
    return this.http.delete('http://localhost:8000/plugins/' + pluginID);
  }

}
