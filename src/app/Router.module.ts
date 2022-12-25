import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './ComponentsToShow/HomePage/Home.component';
import { InboxComponent } from './ComponentsToShow/inbox/inbox.component';
import { SentComponent } from './ComponentsToShow/sent/sent.component';
import { TrashComponent } from './ComponentsToShow/trash/trash.component';
import { DraftCompComponent } from './ComponentsToShow/Draft-comp/draft-comp.component';


const appRoute:Routes=[
    {path:'',component:HomeComponent},
    {path:'Home',component:HomeComponent},
    {path:'Inbox',component:InboxComponent},
    {path:'Sent',component:SentComponent},
    {path:'Trash',component:TrashComponent},
    {path:'draft',component:DraftCompComponent}
]

@NgModule({
    imports: [
      RouterModule.forRoot(appRoute)
    ],
    exports:[
        RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppRouting { }