import { Component } from '@angular/core';
import { Workspace } from '../workspace';
import { WorkspaceService } from '../workspace.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  filter = new FormControl('');
  workspaces: Workspace[] = [];

  constructor(private workspaceService: WorkspaceService, private route: ActivatedRoute) {
    this.workspaces = this.workspaceService.getWorkspaces();
  }


  get filteredWorkspaces() : Workspace [] {
    return this.workspaces.filter((item: Workspace) => item.title.toLowerCase().includes(this.filter.value!.toLowerCase()));
  }
}
