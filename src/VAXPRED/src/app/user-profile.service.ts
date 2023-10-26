import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:8000/users/');
  }

  getUser(id: number) {
    return this.http.get('http://localhost:8000/users/' + id + '/');
  }

  getUserPlugins(id: number): Observable<any> {
    // fetch the plugin IDs subscribed by the user.
    return this.http.get('http://localhost:8000/users/' + id + '/plugins/').pipe(
      switchMap((pluginIds: any) => {
        // fetch information about each plugin using the IDs.
        const pluginRequests: Observable<any>[] = pluginIds.map((pluginId: any) =>
          this.http.get('http://localhost:8000/plugins/' + pluginId['plugin_id'] + '/')
        );

        return forkJoin(pluginRequests);
      })
    );
  }
}
