import { QueryRunner } from 'typeorm';
import { QuestionnaireDto } from './questionnaire.dto';

export interface IQuestionnaire {
	create(sessionId: number, QuestionnaireDto: QuestionnaireDto, queryRunner: QueryRunner): Promise<any>;  
}
