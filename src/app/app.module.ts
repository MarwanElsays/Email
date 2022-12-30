import { MailPageRouteGaurdService } from './services/mail-page-route-gaurd.service';
import { AppRouting } from './Router.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConnectorService } from './services/connector.service';
import { ChangebkcolorDirective } from './Directives/changebkcolor.directive';
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
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';


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
    ViewMailComponent,
    MailPageComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    AppRouting,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [ConnectorService,MailPageRouteGaurdService,AuthService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
