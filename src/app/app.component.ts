import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  private static initializing() {
    AppComponent.loadStyle();
    AppComponent.loadScript();
  }

  private static loadStyle() {
    const dynamicStyles: string[] = [
      
    ];
    for (let i = 0; i < dynamicStyles.length; i++) {
      const node = document.createElement('link');
      node.href = dynamicStyles[i];
      node.type = "text/css";
      node.rel = "stylesheet";
      document.head.append(node);
    }
  }

  private static loadScript() {
    const dynamicScripts: string[] = [
      // "assets/plugins/global/plugins.bundle.js",
      // "assets/js/scripts.bundle.js",
      // "assets/plugins/custom/fullcalendar/fullcalendar.bundle.js",
      // "assets/plugins/custom/datatables/datatables.bundle.js",
      // "assets/js/widgets.bundle.js",
      // "assets/js/custom/widgets.js",
      // "assets/js/custom/apps/chat/chat.js",
      // "assets/js/custom/utilities/modals/upgrade-plan.js",
      // "assets/js/custom/utilities/modals/create-app.js",
      // "assets/js/custom/utilities/modals/users-search.js",
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = "text/javascript";
      node.async = false;
      document.body.append(node);
    }
  }

  ngOnInit(): void {
    AppComponent.initializing();
  }
}
