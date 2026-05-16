import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { Question } from "../../enterprise/entities/question.js";
import type { QuestionsRepository } from "../repositories/question-repository.js";

interface CreateQuestionUseCaseRequest {
    authorId: string
    title: string
    content: string
}

interface CreateQuestionUseCaseResponse {
    question: Question
}

export class CreateQuestionUseCase {
    constructor(
        private questionRepository: QuestionsRepository
    ) {}
    
    async execute({
        authorId, 
        title, 
        content,
    }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
        const question = Question.create({
            authorId: new UniqueEntityID(authorId),
            title,
            content,
        })

        await this.questionRepository.create(question)

        return {
            question
        }
    }
}
