import { HostListener, Input } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICreateNote } from 'src/app/Models/ICreateNote';
import { NotesService } from 'src/app/Services/notes.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isPinned: boolean = false;
  @ViewChild('note') note!: ElementRef;
  @ViewChild('noteActions') noteActions!: ElementRef;
  @ViewChild('noteTitle') noteTitle!: ElementRef;
  newNote: ICreateNote = this.notesService.initializeNote;
  userId = Number(sessionStorage.getItem('userId'));
  backgroundColor: string = 'white';
  label: string = '';
  constructor(private fb: FormBuilder, private notesService: NotesService) { }

  ngOnInit(): void {
  }

  noteForm = this.fb.group({
    noteTitle: [''],
    noteContent: [''],
  })

  get getnoteTitle() {
    return this.noteForm.get('noteTitle');
  }

  get getnoteContent() {
    return this.noteForm.get('noteContent');
  }

  showTitle() {
    this.noteActions.nativeElement.style.display = 'flex'
    this.noteTitle.nativeElement.style.display = 'flex'
  }

  hideTitle() {
    this.noteActions.nativeElement.style.display = 'none'
    this.noteTitle.nativeElement.style.display = 'none'

  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    const clickedInside = this.note.nativeElement.contains(target);
    if (!clickedInside) {
      if (this.getnoteContent?.value !== '' || this.getnoteTitle?.value !== '') {

        if (this.getnoteContent?.value !== null || this.getnoteTitle?.value !== null) {
          this.createNote();
          this.notesService.onCreateNote(this.newNote).subscribe(response => {
            console.log("Value to be sent ", this.newNote);
            this.newNote = this.notesService.initializeNote;
          })

        }
      }
      if (this.getnoteContent?.value == '' || this.getnoteTitle?.value == '') {
        console.log("Note Not Created");
      }
      this.hideTitle();
      this.isPinned = false;
      this.noteForm.reset();

    }
  }

  submitNote() {
    console.log("Note Value")
    console.log(this.noteForm.value)
  }

  createNote() {
    this.newNote.noteContent = this.getnoteContent?.value;
    this.newNote.noteTitle = this.getnoteTitle?.value;
    this.newNote.userId = this.userId;
    this.newNote.isPinned = this.isPinned;
    this.newNote.backgroundColor = this.backgroundColor;
    this.newNote.label = this.label;
    this.newNote.isDeleted = false;
    this.newNote.createdAt = new Date();
  }
}
