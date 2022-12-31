import { MailPageRouteGaurdService } from './services/mail-page-route-gaurd.service';
import { AppRouting } from './Router.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConnectorService } from './services/connector.service';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DraftComponent } from './ComponentsToShow/Draft/draft.component';
import { InboxComponent } from './ComponentsToShow/inbox/inbox.component';
import { NewMailComponent } from './ComponentsToShow/new-mail/new-mail.component';
import { ViewMailComponent } from './ComponentsToShow/view-mail/view-mail.component';
import { SentComponent } from './ComponentsToShow/sent/sent.component';
import { TrashComponent } from './ComponentsToShow/trash/trash.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { MailPageComponent } from './mail-page/mail-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth-service.service';
import { SignupComponent } from './signup/signup.component';
import { ContactsComponent } from './ComponentsToShow/contacts/contacts.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    TopMenuComponent,
    LeftMenuComponent,
    DraftComponent,
    InboxComponent,
    SentComponent,
    TrashComponent,
    NewMailComponent,
    ViewMailComponent,
    MailPageComponent,
    SignupComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    AppRouting,
    ReactiveFormsModule
  ],
  providers: [ConnectorService,MailPageRouteGaurdService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
