
export class RAADSResponseDto {
	socialInteractions: number = 0;
	specificInterests: number = 0;
	language: number = 0;
	sensoriMotor: number = 0;
	totalScore: number;

	socialInteractionsResult: boolean = false;
	specificInterestsResult: boolean = false;
	languageResult: boolean = false;
	sensoriMotorResult: boolean = false;
	totalScoreResult: boolean = false;
}
