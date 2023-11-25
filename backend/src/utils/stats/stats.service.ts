import { Injectable } from "@nestjs/common";
import { jStat } from 'jstat';

@Injectable()
export class StatsService {
	
	getPercentileFromZScore(zScore: number) : number { // test
		const percentile: number = jStat.cdf(zScore, 0, 1);
		return percentile * 100;
	}

	calculateZScore(mean: number, meanPatient: number, sd: number) : number { // test
		return (mean - meanPatient) / sd;
	}
}
