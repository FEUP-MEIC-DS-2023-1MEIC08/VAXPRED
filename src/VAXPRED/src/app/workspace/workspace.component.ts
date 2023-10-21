import { Workspace } from './../workspace';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceService } from '../workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent {
  id: number = 0;
  workspace : Workspace = new Workspace(0, "", "", "");
  constructor(private route: ActivatedRoute, private service: WorkspaceService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.workspace = this.service.getWorkspace(this.id);
      console.log(this.workspace);
    });
  }

}
