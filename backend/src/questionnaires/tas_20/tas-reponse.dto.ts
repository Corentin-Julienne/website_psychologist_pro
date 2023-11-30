
export class TasResponseDto {
	scoreIdentifyingEmotions: number = 0;
	scoreDescribingEmotions: number = 0;
	scoreOperatoryThinking: number = 0;
	totalScore: number = 0;
	result: 'absence' | 'presence';
}
