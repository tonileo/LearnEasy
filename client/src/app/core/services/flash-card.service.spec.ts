import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { FlashCardService } from './flash-card.service';
import { provideHttpClient } from '@angular/common/http';
import { FlashCard } from '../../shared/models/flashCard';
import { environment } from '../../../environments/environment';

const mockFlashCard: FlashCard = {
  id: '1',
  question: 'Question?',
  answer: 'Answer',
  tagId: 1,
  tagName: "tagName",
};

const mockFlashCard2: FlashCard = {
  id: '2',
  question: 'Question?',
  answer: 'Answer',
  tagId: null,
  tagName: null,
};

describe('FlashCardService', () => {
  let service: FlashCardService;
  let testingController: HttpTestingController;
  const baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(FlashCardService);
    testingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    testingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get flashcard with provided id', () => {
    const flashCardId = "1";

    service.getFlashCard(+flashCardId).subscribe((flashCard) => {
      expect(flashCard).toEqual(mockFlashCard);
      expect(flashCard).not.toEqual(mockFlashCard2);
    });
    const mockReq = testingController.expectOne(baseUrl + 'flashCard/' + (+flashCardId));
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(mockFlashCard);
  })

  it('should get count of flashcards for subject with provided subject id', () => {
    const subjectId = 2;
    const mockFlashcardsCount = 28;

    service.getSubjectFlashCardsCount(subjectId).subscribe((flashcardsCount) => {
      expect(flashcardsCount).toEqual(mockFlashcardsCount);
    });
    const mockReq = testingController.expectOne(baseUrl + 'flashCard/subject/' + subjectId);
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(mockFlashcardsCount);
  })

  it('should add flashcard when provided with subject id and flashCard object', () => {
    const subjectId = 3;

    service.addFlashCard(subjectId, mockFlashCard).subscribe(() => {
      expect(true).toBeTrue();
    });
    const mockReq = testingController.expectOne(baseUrl + 'flashCard?subjectId=' + subjectId);
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.request.body.id).toEqual(mockFlashCard.id);
    expect(mockReq.request.body).toEqual(mockFlashCard);
    mockReq.flush(mockFlashCard);
  })

  it('should edit flashcard when provided with flashcard id and form values', () => {
    const flashcardId = 3;
    const mockFormValues = {
      question: "updated question",
      answer: "updated answer",
      tagId: 5
    };

    service.editFlashCard(flashcardId, mockFormValues).subscribe(() => {
      expect(true).toBeTrue();
    });
    const mockReq = testingController.expectOne(baseUrl + 'flashCard?flashCardId=' + flashcardId);
    expect(mockReq.request.method).toEqual('PUT');
    expect(mockReq.request.body).toEqual(mockFormValues);
    mockReq.flush(null);
  })

  it('should delete flashcard when provided with flashcard id', () => {
    const flashcardId = 3;

    service.deleteFlashCard(flashcardId).subscribe(() => {
      expect(true).toBeTrue();
    });
    const mockReq = testingController.expectOne(baseUrl + 'flashCard/' + flashcardId);
    expect(mockReq.request.method).toEqual('DELETE');
    mockReq.flush(null);
  })

  it('should get random flashcards when provided with subject id', () => {
    const subjectId = 3;
    const mockFlashCards: FlashCard[] = [
      mockFlashCard,
      mockFlashCard2
    ];

    service.getRandomFlashCards(subjectId).subscribe((flashCards: FlashCard[]) => {
      expect(flashCards).toBeTruthy();
      expect(flashCards.length).toBeGreaterThan(1);
      expect(flashCards.length).toEqual(mockFlashCards.length);
      expect(flashCards).toEqual(mockFlashCards); 
    });
    const mockReq = testingController.expectOne(baseUrl + 'flashCard/learn/' + subjectId);
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(mockFlashCards);
  })

  it('should patch last reviwed atribute of flashcard when provided with flashcard ids', () => {
    const mockflashcardIds: number[] = [1, 2, 3, 4, 5];

    service.patchLastReviewedFlashCard(mockflashcardIds).subscribe(() => {
      expect(true).toBeTrue();
    });
    const mockReq = testingController.expectOne(baseUrl + 'flashCard/learn');
    expect(mockReq.request.method).toEqual('PATCH');
    expect(mockReq.request.body).toEqual(mockflashcardIds);
    mockReq.flush(null);
  })
});
