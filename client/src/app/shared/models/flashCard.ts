export interface FlashCard {
    id: string;
    question: string; 
    answer: string;
    tagId: number | null;
    tagName: string | null;
}