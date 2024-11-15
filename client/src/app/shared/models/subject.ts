export interface Subject {
    name: string;
    flashCardQuestions: string[];
    noteNames: string[];
    pdfFileNames: string[];

    flashCardsCount: number;
    pdfFilesCount: number;
    notesCount: number;
}