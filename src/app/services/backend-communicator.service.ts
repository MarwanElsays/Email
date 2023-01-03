import { Email } from 'src/app/Classes/Email';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../ComponentsToShow/contacts/contacts.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendCommunicatorService {

  constructor(private http: HttpClient) { }
  
  //Done
  public verifySignIn(emailAddress: string, password: string) {
    // "false" if new user, userId if current user
    return this.http.get<string>('http://localhost:8080/signIn', {
      params: new HttpParams()
        .set('emailAddress', emailAddress)
        .set('password', password)
    });
  }

  //Done
  public verifySignUp(emailAddress: string, password: string) {
    // false if current user, id if new user
    return this.http.get<string>('http://localhost:8080/signUp', {
      params: new HttpParams()
        .set('emailAddress', emailAddress)
        .set('password', password)
    });
  }

  public signOut(userId: number) {
      // delete user session because of sign out
    return this.http.delete('http://localhost:8080/signOut',{params:new HttpParams().set('userId',userId)}).subscribe();
  }

  //Done
  public getEmailsList(userId: number, folderName: string, sortType: number, sortIdntifier: number, start: number) {
    return this.http.get<Email[]>('http://localhost:8080/getEmailsList', {
      params: new HttpParams()
        .set('userId', userId)
        .set('folderName', folderName)
        .set('sortType', sortType.toString())
        .set('sortIdntifier', sortIdntifier.toString())
        .set('start', start.toString())
    });
  }

  //Done
  public getCustomFolders(userId: number) {
    return this.http.get<string[]>('http://localhost:8080/getAllCustomFolders', {
      params: new HttpParams()
        .set('userId', userId)
    });
  }

  //not needed
  public getEmailsNumber(userId: number, folderName: string) {
    return this.http.get('http://localhost:8080/getEmailsNumbers', {
      params: new HttpParams()
        .set('userId', userId)
        .set('folderName', folderName)
    }).subscribe();
  }

  //Done
  public createNewCustomFolder(userId: number, folderName: string) {
    return this.http.get('http://localhost:8080/createNewCustomFolder', {
      params: new HttpParams()
        .set('userId', userId)
        .set('folderName', folderName)
    });
  }

  //Done
  public renameCustomFolder(userId: number, oldFolderName: string, newFolderName: string) {
    return this.http.get('http://localhost:8080/renameCustomFolder', {
      params: new HttpParams()
        .set('userId', userId)
        .set('oldFolderName', oldFolderName)
        .set('newFolderName', newFolderName)
    });
  }

  //Done
  public deleteCustomFolder(userId: number, folderName: string) {
    return this.http.delete('http://localhost:8080/deleteCustomFolder', {
      params: new HttpParams()
        .set('userId', userId)
        .set('folderName', folderName)
    });
  }

  //sendingEmail //Done
  public sendEmail(emailData: string){
    return this.http.post('http://localhost:8080/sendEmail', null, { 
      params: new HttpParams()
      .set('emailData', emailData)
    });
  }

  //deleting email //Done
  public deleteEmail(userId: number, emailId: string, folderName: string) {
    return this.http.delete('http://localhost:8080/deleteEmail', {
      params: new HttpParams()
      .set('userId', userId)
      .set('emailId', emailId)
      .set('folderName', folderName) 
    });
  }

  // Done 
  public deleteEmailForever(userId: number, emailId: string) {
    return this.http.delete('http://localhost:8080/deleteForever', {
      params: new HttpParams()
      .set('userId', userId)
      .set('emailId', emailId) 
    });
  }

  // Done
  public deleteMultipleEmails(userId: number, emailsIds: string, folderName: string) {
    return this.http.delete('http://localhost:8080/deleteMultipleEmails', {
      params: new HttpParams()
      .set('userId', userId)
      .set('emailsIds', emailsIds)
      .set('folderName', folderName) 
    });
  }

  //search //Done
  public searchFile(userId: number, required: string, folderName: string, criteria: string) {
    return this.http.get<Email[]>('http://localhost:8080/searchFile', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('required', required)
      .set('folderName', folderName)
      .set('criteria', criteria) 
    });
  }

  // Done
  public searchAll(userId: number, required: string, criteria: string) {
    return this.http.get<Email[]>('http://localhost:8080/searchAll', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('required', required)
      .set('criteria', criteria) 
    });
  }

  //filter //Done
  public filter(userId: number, required: string, fileName: string, criteria: string) {
    return this.http.get<Email[]>('http://localhost:8080/filter', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('required', required)
      .set('fileName', fileName)
      .set('criteria', criteria) 
    });
  }

  //sort  // Done
  public sort(userId: number, folderName: string, sortType: number, sortIdntifier: number) {
    return this.http.get<Email[]>('http://localhost:8080/sort', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('folderName', folderName)
      .set('sortType', sortType)
      .set('sortIdntifier', sortIdntifier)
    });
  }

  public uploadMultipleFiles(files: FormData) {
    return this.http.post('http://localhost:8080/uploadMultipleFiles', files);
  }

  public downloadFile(fileName: string, userId: number, emailId: string) {
    return this.http.get('http://localhost:8080/downloadFile/' + fileName, {
      params: new HttpParams()
        .set('userId', userId)
        .set('emailId', emailId),
        responseType: 'text'
    });
  }

  //Done
  public addNewContact(userId: number, contactName: string, emailAddresses: string) {
    return this.http.get<Contact[]>('http://localhost:8080/addNewContact', {
      params: new HttpParams()
      .set('userId', userId)
      .set('contactName', contactName)
      .set('emailAddresses', emailAddresses)
    });
  }
  
  //Done
  public editContactName(userId: number, olderContactName: string, newContactName: string) {
    return this.http.get<Contact[]>('http://localhost:8080/editContactName', {
      params: new HttpParams()
      .set('userId', userId)
      .set('olderContactName', olderContactName)
      .set('newContactName', newContactName)
    });
  }

  //Done
  public editContactEmails(userId: number, contactName: string, newEmailAddresses: string) {
    return this.http.get<Contact[]>('http://localhost:8080/editContactEmails', {
      params: new HttpParams()
      .set('userId', userId)
      .set('contactName', contactName)
      .set('newEmailAddresses', newEmailAddresses)
    });
  }

  //Done
  public deleteContact(userId: number, contactName: string) {
    return this.http.delete<Contact[]>('http://localhost:8080/deleteContact', {
      params: new HttpParams()
      .set('userId', userId)
      .set('contactName', contactName)
    });
  }
  
  //Still
  public MoveEmail(userId: number, emailId: string, sourceFolderName: string, distFolderName: string){
    return this.http.delete('http://localhost:8080/moveEmail', {
      params: new HttpParams()
      .set('userId', userId)
      .set('emailId', emailId)
      .set('sourceFolderName', sourceFolderName)
      .set('distFolderName', distFolderName)
    });
  }
  
  //Done
  public MoveMultipleEmails(userId: number, emailsIds: string, sourceFolderName: string, distFolderName: string){
    return this.http.delete('http://localhost:8080/moveMultipleEmails', {
      params: new HttpParams()
      .set('userId', userId)
      .set('emailsIds', emailsIds)
      .set('sourceFolderName', sourceFolderName)
      .set('distFolderName', distFolderName)
    });
  }

  
  //Done
  public getAllContacts(userId: number) {
    return this.http.get<Contact[]>('http://localhost:8080/getAllContacts', {
      params: new HttpParams()
      .set('userId', userId)
    })
  }

  public moveEmailToDraft(emailData: string) {
    return this.http.delete('http://localhost:8080/moveEmailToDraft', {
      params: new HttpParams()
      .set('emailData', emailData)
    });
  }
}
