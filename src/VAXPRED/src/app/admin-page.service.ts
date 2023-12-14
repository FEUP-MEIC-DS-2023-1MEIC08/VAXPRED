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

  addPlugin(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/plugins/', data)
  }

  editPlugin(pluginID: number, data: any): Observable<any> {
    return this.http.put('http://localhost:8000/plugins/' + pluginID, data)
  }

  getTags() {
    return this.http.get('http://localhost:8000/tags/')
  }

  createTag(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/tags/', data)
  }

  associateTag(pluginID: number, tagID: number) {
    return this.http.post('http://localhost:8000/tags/' + tagID + '/plugins/' + pluginID + '/associate/', "")
  }

}
