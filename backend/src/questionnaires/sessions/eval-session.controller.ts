import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { EvalSessionService } from './eval-session.service';
import { EvalSessionDto } from './eval-session.dto';
import { EvalSession } from './eval-session.entity';

@Controller('users/:userId/eval-sessions')
export class EvalSessionController {

	constructor(private evalSessionService: EvalSessionService) {};
	
	// @Post()
	// createEvalSession(
	// 	@Param('userId') userId: number,
	// 	@Body() evalSessionDto: EvalSessionDto
	// ) : Promise<EvalSession> {
	// 	return this.evalSessionService.createEvalSession(userId, evalSessionDto);
	// }

	@Delete(':id')
	deleteEvalSession(@Param('id') evalSessionId: number) : Promise<void> {
		return this.evalSessionService.deleteEvalSession(evalSessionId);
	}
}
