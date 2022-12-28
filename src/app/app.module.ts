import { AppRouting } from './Router.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConnectorService } from './services/connector.service';
import { ChangebkcolorDirective } from './Directives/changebkcolor.directive';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DraftComponent } from './ComponentsToShow/Draft/draft.component';
import { InboxComponent } from './ComponentsToShow/inbox/inbox.component';
import { NewMailComponent } from './ComponentsToShow/new-mail/new-mail.component';
import { SentEmailsComponent } from './ComponentsToShow/sent/sent-emails/sent-emails.component';
import { SentComponent } from './ComponentsToShow/sent/sent.component';
import { TrashComponent } from './ComponentsToShow/trash/trash.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { MailPageComponent } from './mail-page/mail-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    ChangebkcolorDirective,
    LoginComponent,
    MainPageComponent,
    TopMenuComponent,
    LeftMenuComponent,
    DraftComponent,
    InboxComponent,
    SentComponent,
    TrashComponent,
    NewMailComponent,
    SentEmailsComponent,
    MailPageComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    AppRouting
  ],
  providers: [ConnectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
