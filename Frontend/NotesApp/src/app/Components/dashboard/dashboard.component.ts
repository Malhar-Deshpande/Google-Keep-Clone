import { HostListener, Input } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isPinned: boolean = false;
  @ViewChild('note') note!: ElementRef;
  @ViewChild('createNoteAction') createNoteAction!: ElementRef;
  @ViewChild('noteTitle') noteTitle!: ElementRef;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  noteForm = this.fb.group({
    noteTitle: [''],
    noteContent: [''],
  })

  showTitle() {
    this.createNoteAction.nativeElement.style.display = 'flex'
    this.noteTitle.nativeElement.style.display = 'flex'
  }

  hideTitle() {
    this.createNoteAction.nativeElement.style.display = 'none'
    this.noteTitle.nativeElement.style.display = 'none'

  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    console.log("TARGET CLASS ", target)
    const clickedInside = this.note.nativeElement.contains(target);
    if (!clickedInside) {
      this.hideTitle();
      console.log("Note Form Value ", this.noteForm.value)
      this.noteForm.reset();
    }
  }

  submitNote() {
    console.log("Note Value")
    console.log(this.noteForm.value)
  }
}
