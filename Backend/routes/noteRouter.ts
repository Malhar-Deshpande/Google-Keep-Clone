import { NextFunction, Request, Response, Application, Router, request } from "express";
import { NoteHelper } from "../helper/noteHelper";
import { note } from "../types/noteType";

export class NoteRouter {
  public router: Router;
  public noteHelper: NoteHelper;

  constructor() {
    this.router = Router();
    this.noteHelper = new NoteHelper();
  }

  CreateNote: any = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const note: any = request.body;
    try {
      const newNote = await this.noteHelper.createNote(note);
      return response.status(200).json({
        message: "successfully created new note"
      });
    } catch (error) {
      console.log(error);
      return response.status(400).json(error);
    }
  };

  // WHY IS THIS METHOD GIVING ERROR
  // async GetAllNotes(request: Request, response: Response, next: NextFunction) {
  //   try {
  //     const allNotes = await this.noteHelper.getAllNotes();
  //     return response.status(200).json({
  //       status: "Successfull",
  //       data: allNotes
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     return response.status(400).json({
  //       message: "Failure",
  //       error: error
  //     })
  //   }
  // }

  GetAllNotes: any = async (
    request: Request,
    response: Response
  ) => {
    try {
      const allNotes = await this.noteHelper.getAllNotes();
      return response.status(200).json({
        status: "Successfull",
        data: allNotes
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        message: "Failure",
        error: error
      })
    }
  };

  GetNoteById = async (
    request: Request, response: Response
  ) => {
    const NoteId: number = parseInt(request.params.NoteId)
    try {
      const singleNote = await this.noteHelper.getNoteById(NoteId)
      return response.status(200).json({
        status: "Successfull",
        data: singleNote
      })

    } catch (error) {
      console.log(error)
      return response.status(400).json({
        message: "Failure",
        error: error
      })
    }
  }

  DeleteNoteById = async (request: Request, response: Response) => {
    const NoteId: number = parseInt(request.params.NoteId)
    try {
      const singleNote = await this.noteHelper.deleteNoteById(NoteId)
      return response.status(200).json({
        status: "Successfull",
        data: singleNote
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        message: "Failure",
        error: error
      })
    }
  }

  UpdateNote = async (
    request: Request, response: Response
  ) => {
    const noteToUpdate: note = request.body
    try {
      const isUpdatedNote = await this.noteHelper.updateNote(noteToUpdate)
      if (isUpdatedNote == 1) {
        return response.status(200).json({
          status: "Successfully Updated Note",
          data: noteToUpdate
        })
      }

      else {
        return response.status(200).json({
          status: "No Note To Update",
          data: noteToUpdate
        })
      }
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        message: "Failure",
        error: error
      })
    }
  }


  GetAllPinnedNotes = async (
    request: Request, response: Response
  ) => {
    try {
      const allPinnedNotes = await this.noteHelper.getAllPinnedNotes();
      return response.status(200).json({
        status: "Successfull",
        data: allPinnedNotes
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        message: "Failure",
        error: error
      })
    }
  }

  GetAllUnPinnedNotes = async (
    request: Request, response: Response
  ) => {
    try {
      const allUnPinnedNotes = await this.noteHelper.getAllUnPinnedNotes();
      return response.status(200).json({
        status: "Successfull",
        data: allUnPinnedNotes
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        message: "Failure",
        error: error
      })
    }
  }

  routes(app: Application) {
    app.route("/createnote").post(this.CreateNote);
    app.route("/getAllNotes").get(this.GetAllNotes);
    app.route("/getOneNote/:NoteId").get(this.GetNoteById);
    app.route("/updateNote").post(this.UpdateNote);
    app.route("/getAllPinnedNotes").get(this.GetAllPinnedNotes);
    app.route("/getAllUnPinnedNotes").get(this.GetAllUnPinnedNotes);
    app.route("/deleteNote/:NoteId").delete(this.DeleteNoteById);
    //CREATE NEW ROUTE FOR UPDATING COLOUR

  }
}
