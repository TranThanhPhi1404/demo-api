import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    name: string;
    email: string;
    sdt: string;
  }
@Injectable({
    providedIn: 'root'
  })

  export class UserService {
    private apiUrl = 'https://localhost:5001/api/User'; 
    private zaloApiUrl = ''; 
    private gmailApiUrl ='';
    constructor(private http: HttpClient) { }
  
      getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
      }
    
      getUser(sdt: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${sdt}`);
      }
    
      addUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
      }
    
      updateUser(sdt: string, user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${sdt}`, user);
      }
    
      deleteUser(sdt: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${sdt}`);
      }
      getUserBySdt(sdt: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${sdt}`);
      }
      
      sendViaZalo(message: any): Observable<any> {
        console.log('OKE');
        return this.http.post(this.zaloApiUrl, message);
      }
    
      sendViaGmail(message: any): Observable<any> {
        console.log('OKE');
        return this.http.post(this.gmailApiUrl, message);
      }
  }