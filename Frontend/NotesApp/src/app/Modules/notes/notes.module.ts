import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { MaterialModule } from '../material/material.module';
import { NotesService } from 'src/app/Services/notes.service';
import { AllNotesComponent } from 'src/app/Components/all-notes/all-notes.component';


@NgModule({
  declarations: [AllNotesComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MaterialModule
  ],
  providers: [NotesService],
  exports: [AllNotesComponent]
})
export class NotesModule { }
