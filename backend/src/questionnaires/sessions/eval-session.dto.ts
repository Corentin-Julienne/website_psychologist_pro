import { QuestionnaireDto } from "./questionnaire.dto";

export class EvalSessionDto {
	createdAt: Date;
	questionnaires: QuestionnaireDto[];
}
