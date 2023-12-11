import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Plugin } from './plugin';

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
        var plugins = [];
        for (let plugin of pluginIds.associations) {
          plugins.push(this.http.get('http://localhost:8000/plugins/' + plugin.id + '/'));
        }
        return forkJoin(plugins);
      })
    );
  }

  removePlugin(userID: number, pluginID: number){
    return this.http.delete('http://localhost:8000/users/' + userID + '/plugins/' + pluginID + '/disassociate/');
  }
}
