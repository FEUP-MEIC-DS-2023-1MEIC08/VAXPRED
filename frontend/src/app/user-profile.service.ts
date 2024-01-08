import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Plugin } from './plugin';

/**
 * Service responsible for handling user profile-related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  /**
   * Retrieves all users.
   * @returns User's data.
   */
  getUsers() {
    return this.http.get('http://localhost:8123/users/');
  }

  /**
   * Retrieves a specific user by ID.
   * @param id The ID of the user to fetch.
   * @returns User data.
   */
  getUser(id: number) {
    return this.http.get('http://localhost:8123/users/' + id + '/');
  }

  /**
   * Retrieves plugins associated with a user.
   * @param id The ID of the user.
   * @returns User's plugins.
   */
  getUserPlugins(id: number): Observable<any> {
    // fetch the plugin IDs subscribed by the user.
    return this.http.get('http://localhost:8123/users/' + id + '/plugins/').pipe(
      switchMap((pluginIds: any) => {
        var plugins = [];
        for (let plugin of pluginIds.associations) {
          plugins.push(this.http.get('http://localhost:8123/plugins/' + plugin.id + '/'));
        }
        return forkJoin(plugins);
      })
    );
  }

  /**
   * Removes a plugin associated with a user.
   * @param userID The ID of the user.
   * @param pluginID The ID of the plugin to remove.
   * @returns An indication for the success of the removal operation.
   */
  removePlugin(userID: number, pluginID: number){
    return this.http.delete('http://localhost:8123/users/' + userID + '/plugins/' + pluginID + '/disassociate/');
  }
}
