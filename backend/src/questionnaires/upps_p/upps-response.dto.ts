
export class UPPSResponseDto {
	positiveUrgency: number = 0;
	negativeUrgency: number = 0;
	premeditation: number = 0;
	perseverance: number = 0;
	sensationSeeking: number = 0;

	positiveUrgencyZ: number;
	negativeUrgencyZ: number;
	premeditationZ: number;
	perseveranceZ: number;
	sensationSeekingZ: number;

	positiveUrgencyPercentile: number;
	negativeUrgencyPercentile: number;
	premeditationPercentile: number;
	perseverancePercentile: number;
	sensationSeekingPercentile: number;

	positiveUrgencyResult: string;
	negativeUrgencyResult: string;
	premeditationResult: string;
	perseveranceResult: string;
	sensationSeekingResult: string;
}
