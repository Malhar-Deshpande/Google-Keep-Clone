import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateNote } from '../Models/ICreateNote';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  initializeNote: ICreateNote = { userId: 0, noteTitle: '', noteContent: '', isPinned: false, backgroundColor: '', createdAt: new Date(), isDeleted: false, label: '' }

  constructor(private httpClient: HttpClient) { }

  url = 'http://localhost:8080/'
  onCreateNote(noteToSend: ICreateNote) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };

    return this.httpClient.post(this.url + 'createnote', noteToSend, httpOptions)
  }
}
