import { Component, OnInit } from '@angular/core';
import { INote } from 'src/app/Models/INote';
import { NotesService } from 'src/app/Services/notes.service';
@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['../../../assets/Bootstrap/css/bootstrap.min.css', './all-notes.component.scss']
})
export class AllNotesComponent implements OnInit {

  constructor(private notesService: NotesService) { }
  allNotes: INote[] = [];
  ngOnInit(): void {
    this.getAllNotes();
  }

  getAllNotes() {
    this.notesService.OnGetAllNotes().subscribe(response => {
      if (response) {
        this.allNotes = response['data'];
        console.log("DATA", response['data'])
      }

    })
  }
}
