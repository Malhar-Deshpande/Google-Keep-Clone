import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { HostListener, Input } from '@angular/core';
import { NgZone } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICreateNote } from 'src/app/Models/ICreateNote';
import { NotesService } from 'src/app/Services/notes.service';
import { take } from 'rxjs/operators';

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
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  newNote: ICreateNote = this.notesService.initializeNote;
  userId = Number(sessionStorage.getItem('userId'));
  backgroundColor: string = 'white';
  label: string = '';
  constructor(private fb: FormBuilder, private notesService: NotesService, private _ngZone: NgZone) { }

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
    this.noteForm.reset();

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
          console.log("Value to be sent ", this.newNote);
        }
      }
      if (this.getnoteContent?.value !== null || this.getnoteTitle?.value !== null) {
        console.log("Note Not Created");
      }
      this.hideTitle();
      this.isPinned = false;
      this.noteForm.reset();

    }
  }

  submitNote() {
    this.onClick;
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

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}


