import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

/**
 * Service responsible for admin page operations.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminPageService {

  constructor(private http: HttpClient) { }

  /**
   * Retrieves all plugins.
   * @returns An array of plugins.
   */
  getAllPlugins(): Observable<any[]> {
    return this.http.get('http://localhost:8123/plugins/').pipe(
      map((response: any) => response.plugins)
    );
  }

  /**
   * Removes a plugin by ID.
   * @param pluginID The ID of the plugin to be removed.
   * @returns An indication for the success of the removal operation.
   */
  removePlugin(pluginID: number){
    return this.http.delete('http://localhost:8123/plugins/' + pluginID);
  }


  /**
   * Retrieves all categories.
   * @returns An array of categories.
   */
  getAllCategories(): Observable<any[]> {
    return this.http.get('http://localhost:8123/categories/').pipe(
      map((response: any) => response.categories)
    )
  }

  /**
   * Adds a new plugin.
   * @param data The data of the plugin to be added.
   * @returns Added plugin data.
   */
  addPlugin(data: any): Observable<any> {
    return this.http.post('http://localhost:8123/plugins/', data)
  }

  /**
   * Updates an existing plugin.
   * @param pluginID The ID of the plugin to be updated.
   * @param data The updated data for the plugin.
   * @returns Updated plugin data.
   */
  editPlugin(pluginID: number, data: any): Observable<any> {
    return this.http.put('http://localhost:8123/plugins/' + pluginID, data)
  }


  /**
   * Associates a category with a plugin.
   * @param pluginID The ID of the plugin.
   * @param categoryID The ID of the category to associate.
   * @returns An indication for the success of the association.
   */
  associateCategory(pluginID: number, categoryID: number) {
    return this.http.post('http://localhost:8123/categories/' + categoryID + '/plugins/' + pluginID + '/associate/', "")
  }

  /**
   * Retrieves all available tags.
   * @returns All tags.
   */
  getTags() {
    return this.http.get('http://localhost:8123/tags/')
  }

  /**
   * Creates a new tag.
   * @param data The data of the tag to be created.
   * @returns Created tag data.
   */
  createTag(data: any): Observable<any> {
    return this.http.post('http://localhost:8123/tags/', data)
  }

  /**
   * Associates a tag with a plugin.
   * @param pluginID The ID of the plugin.
   * @param tagID The ID of the tag to associate.
   * @returns An indication of the success of the association.
   */
  associateTag(pluginID: number, tagID: number) {
    return this.http.post('http://localhost:8123/tags/' + tagID + '/plugins/' + pluginID + '/associate/', "")
  }

  /**
   * Disassociates a tag with a plugin.
   * @param pluginID The ID of the plugin.
   * @param tagID The ID of the tag to disassociate.
   * @returns An indication of the success of the disassociation.
   */
  disassociateTag(pluginID: number, tagID: number) {
    return this.http.delete('http://localhost:8123/tags/' + tagID + '/plugins/' + pluginID + '/disassociate/')
  }

}
