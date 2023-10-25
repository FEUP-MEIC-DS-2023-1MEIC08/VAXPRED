import { Injectable } from '@angular/core';
import { Plugin } from '../plugin';

@Injectable({
  providedIn: 'root'
})
export class PluginService {
  constructor() { } // you can inject any dependencies here, like http client etc

  getPlugins(): Plugin[] {
    // TODO get plugins from server
    return []
  }

  getPlugin(id: number): Plugin {
    return new Plugin(0, "Plugin123", "This Plugin123 is a plugin");
  }
}
