import { SmallFlashCard } from "./smallFlashCrd";

export interface Subject {
    name: string;
    flashCards: SmallFlashCard[];
    noteNames: string[];
    pdfFileNames: string[];

    flashCardsCount: number;
    pdfFilesCount: number;
    notesCount: number;
}