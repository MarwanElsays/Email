import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendCommunicatorService {

  constructor(private http: HttpClient) { }

  public verifySignIn(emailAddress: string, password: string): Observable<string> {
    // "false" if new user, userId if current user
    return this.http.get<string>('http://localhost:8080/signIn', {
      params: new HttpParams()
        .set('emailAddress', emailAddress)
        .set('password', password)
    });
  }

  public verifySignUp(emailAddress: string, password: string) {
    // false if current user, id if new user
    return this.http.get('http://localhost:8080/signUp', {
      params: new HttpParams()
        .set('emailAddress', emailAddress)
        .set('password', password)
    });
  }

  public getEmailsList(userId: number, folderName: string, sortType: number, sortIdntifier: number, start: number) {
    return this.http.get('http://localhost:8080/getEmailsList', {
      params: new HttpParams()
        .set('userId', userId)
        .set('folderName', folderName)
        .set('sortType', sortType)
        .set('sortIdntifier', sortIdntifier)
        .set('start', start)
    }).subscribe();
  }

  public getCustomFolders(userId: number) {
    return this.http.get('http://localhost:8080/getAllCustomFolders', { 
      params: new HttpParams()
      .set('userId', userId) 
    }).subscribe();
  }

  public getEmailsNumber(userId: number, folderName: string) {
    return this.http.get('http://localhost:8080/getEmailsNumbers', {
       params: new HttpParams()
       .set('userId', userId)
       .set('folderName', folderName) 
      }).subscribe();
  }

  public createNewCustomFolder(userId: number, folderName: string) {
    return this.http.get('http://localhost:8080/createNewCustomFolder', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('folderName', folderName) 
    }).subscribe();
  }

  public renameCustomFolder(userId: number, oldFolderName: string, newFolderName: string) {
    return this.http.get('http://localhost:8080/renameCustomFolder', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('oldFolderName', oldFolderName)
      .set('newFolderName', newFolderName) 
    }).subscribe();
  }

  public deleteCustomFolder(userId: number, folderName: string) {
    return this.http.delete('http://localhost:8080/deleteCustomFolder', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('folderName', folderName) 
    }).subscribe();
  }

  //sendingEmail
  public sendEmail(emailData: string) {
    this.http.post('http://localhost:8080/sendEmail', null, { 
      params: new HttpParams()
      .set('emailData', emailData) 
    }).subscribe();
  }

  //deleting email
  public deleteEmail(userId: number, emailId: string, folderName: string) {
    return this.http.delete('http://localhost:8080/deleteEmail', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('emailId', emailId)
      .set('folderName', folderName) 
    }).subscribe();
  }

  public deleteEmailForever(userId: number, emailId: string) {
    return this.http.delete('http://localhost:8080/deleteForever', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('emailId', emailId) 
    }).subscribe();
  }

  public deleteMultipleEmails(userId: number, emailsIds: string, folderName: string) {
    return this.http.delete('http://localhost:8080/deleteMultipleEmails', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('emailsIds', emailsIds)
      .set('folderName', folderName) 
    }).subscribe();
  }

  //search 
  public searchFile(userId: number, required: string, folderName: string, criteria: string) {
    return this.http.get('http://localhost:8080/searchFile', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('required', required)
      .set('folderName', folderName)
      .set('criteria', criteria) 
    }).subscribe();
  }

  public searchAll(userId: number, required: string, criteria: string) {
    return this.http.get('http://localhost:8080/searchAll', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('required', required)
      .set('criteria', criteria) 
    }).subscribe();
  }

  //filter
  public filter(userId: number, required: string, fileName: string, criteria: string) {
    return this.http.get('http://localhost:8080/filter', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('required', required)
      .set('fileName', fileName)
      .set('criteria', criteria) 
    }).subscribe();
  }

  //sort
  public sort(userId: number, folderName: string, sortType: number, sortIdntifier: number) {
    return this.http.get('http://localhost:8080/sort', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('folderName', folderName)
      .set('sortType', sortType)
      .set('sortIdntifier', sortIdntifier)
    }).subscribe();
  }

  public uploadMultipleFiles(files: FileList) {
    // return this.http.get('http://localhost:8080/uploadMultipleFiles', { params: new HttpParams().set('files', files) });
  }
  public downloadFile(userId: number, emailId: string) {
    return this.http.get('http://localhost:8080/downloadFile/{fileName:.+}', { 
      params: new HttpParams()
      .set('userId', userId)
      .set('emailId', emailId) 
    }).subscribe();
  }
}
