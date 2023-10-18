import { Injectable } from '@angular/core';
import { Workspace } from './workspace';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  list = [
    new Workspace(1, 'Vaccine X', 'Description 1'),
    new Workspace(2, 'Protein', 'Description 2'),
    new Workspace(3, 'Virus', 'Description 3'),
  ]
  constructor() { } // you can inject any dependencies here, like http client etc

  getWorkspaces(): Workspace[] {
    return this.list;
  }

  getWorkspace(id: number): Workspace {
    return this.list.find((item: Workspace) => item.id == id)!;
  }

}
