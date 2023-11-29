import { EvalSessionDto } from '../questionnaires/sessions/eval-session.dto';

export class CreateUserDto {
	createdAt: Date;
	evalSessionDto: EvalSessionDto;
}
