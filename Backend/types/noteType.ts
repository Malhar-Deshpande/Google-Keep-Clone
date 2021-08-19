export interface note {
  noteId: number;
  userId: number;
  noteTitle: string;
  noteContent: string;
  isPinned: boolean;
  backgroundColor: string;
  createdAt: Date;
  //   image:Blob
  isDeleted: boolean;
  label: string;
  //   reminder:Date
}
