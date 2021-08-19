import { where } from "sequelize";
import { Note } from "../models/notesModel";
import { note } from "../types/noteType";

export class NoteHelper {

  async createNote(newNote: note) {
    const note: note = await Note.create(newNote);
    return "Note created successfully";
  }

  async getAllNotes() {
    const allNotes: note[] = await Note.findAll()
    return allNotes;
  }

  async getNoteById(NoteId: number) {
    const note: (note | null) = await Note.findByPk(NoteId)
    return note;
  }

  async updateNote(updatedNote: note) {
    let noteIdToUpdate: number = updatedNote.noteId;
    const isUpdatedNote: any = await Note.update(updatedNote, {
      where: {
        noteId: noteIdToUpdate
      }
    })
    return isUpdatedNote;
  }

  async getAllPinnedNotes() {
    const allPinnedNotes: note[] = await Note.findAll({
      where: {
        isPinned: true
      }
    })
    return allPinnedNotes;
  }

  async getAllUnPinnedNotes() {
    const allUnPinnedNotes: note[] = await Note.findAll({
      where: {
        isPinned: false
      }
    })
    return allUnPinnedNotes;
  }

  async deleteNoteById(NoteId: number) {
    const note: any = await Note.findByPk(NoteId);
    await note.destroy();
    return "Note deleted Successfully";
  }
}
