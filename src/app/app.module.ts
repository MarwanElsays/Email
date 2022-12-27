import { AppRouting } from './Router.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { HomeComponent } from './ComponentsToShow/HomePage/Home.component';
import { DraftComponent } from './ComponentsToShow/Draft/draft.component';
import { InboxComponent } from './ComponentsToShow/inbox/inbox.component';
import { SentComponent } from './ComponentsToShow/sent/sent.component';
import { TrashComponent } from './ComponentsToShow/trash/trash.component';
import { NewMailComponent } from './ComponentsToShow/new-mail/new-mail.component';
import { ConnectorService } from './services/connector.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SentEmailsComponent } from './ComponentsToShow/sent/sent-emails/sent-emails.component';
import { ChangebkcolorDirective } from './Directives/changebkcolor.directive';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    MainPageComponent,
    LeftMenuComponent,
    DraftComponent,
    HomeComponent,
    InboxComponent,
    SentComponent,
    TrashComponent,
    NewMailComponent,
    SentEmailsComponent,
    ChangebkcolorDirective,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [ConnectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
