import { AppRouting } from './Router.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { HomeComponent } from './ComponentsToShow/HomePage/Home.component';
import { DraftCompComponent } from './ComponentsToShow/Draft-comp/draft-comp.component';
import { InboxComponent } from './ComponentsToShow/inbox/inbox.component';
import { SentComponent } from './ComponentsToShow/sent/sent.component';
import { TrashComponent } from './ComponentsToShow/trash/trash.component';


@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    MainPageComponent,
    LeftMenuComponent,
    DraftCompComponent,
    HomeComponent,
    InboxComponent,
    SentComponent,
    TrashComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
