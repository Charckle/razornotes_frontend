export class Note {
    _id!: number;
    title!: string;
    text!: string;
    note_type?: number;
    active?: number;
    relevant?: number;
    pinned?: number;
  }
