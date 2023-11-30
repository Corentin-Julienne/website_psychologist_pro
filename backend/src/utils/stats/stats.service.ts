import { Injectable } from "@nestjs/common";
import { jStat } from 'jstat';

@Injectable()
export class StatsService {
	
	calculateZScore(mean: number, meanPatient: number, sd: number) : number { // test
		return (mean - meanPatient) / sd;
	}
	
	getPercentileFromZScore(zScore: number) : number { // test
		const percentile: number = jStat.cdf(zScore, 0, 1);
		return percentile * 100;
	}

	getCommentFromPercentile(percentile: number) : string { // update and modify
		if (percentile <= 5) {
			return 'deficit';
		} else if (percentile > 5 && percentile <= 10) {
			return 'limit';
		} else if (percentile > 10 && percentile <= 25) {
			return 'medium weak';
		} else if (percentile > 25 && percentile <= 75) {
			return 'medium';
		} else if (percentile > 75 && percentile <= 90) {
			return 'medium superior';
		} else if (percentile > 90 && percentile <= 95) {
			return 'superior';
		} else {
			return 'very superior';
		}
	}
	
	processReverseItems(items: number[], itemsToReverse: number[], max: number) : number[] { // to test
		for (let i = 0; i < items.length; i++) {
			if (itemsToReverse.includes(i)) {
				items[i] = this.reverseItem(items[i], max);
			}
		}
		return items;
	}

	private reverseItem(item: number, max: number) : number { // to test
		const distToMax: number = max - item;

		return distToMax + 1;
	}
}
