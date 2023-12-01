import { Component, Inject, OnInit } from '@angular/core';
import { NotesDataService } from "../../services/notes_data.service";
import { Note } from "../../classes/note";
import { BROWSER_STORAGE } from "../../classes/storage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  constructor(
    private notesDataService: NotesDataService,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  ngOnInit() {
    this.getNotesPinned(this.notesPinned);
    this.getIndexNotes(this.notesIndex);
  }

  protected message!: string;
  protected notesPinned!: Note[];

  private getNotesPinned = (notesPinned: any) => {
    this.message = "Loading  ...";

    this.notesDataService
      .getPinnedNotes()
      .subscribe((notesPinned) => {
        this.message = notesPinned.length > 0 ? "" : "No notes found!";
        this.notesPinned = notesPinned;
      });
  };


  protected notesIndex!: Note[];

  private getIndexNotes = (notesIndex: any) => {
    this.message = "Loading  ...";

    this.notesDataService
      .getIndexNotes()
      .subscribe((notesIndex) => {
        this.message = notesIndex.length > 0 ? "" : "No notes found!";
        this.notesIndex = notesIndex;
      });
  };


  

  private displayError = (error: any) => {
    this.message = error.message;
  };

}
