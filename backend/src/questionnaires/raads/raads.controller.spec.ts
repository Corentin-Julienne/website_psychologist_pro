import { Test, TestingModule } from "@nestjs/testing";
import { RAADSController } from "./raads.controller";
import { RAADSService } from './raads.service';

describe('RAADSController', () => {

	let controller: RAADSController;
	let service: RAADSService;

	beforeEach(async () => {

		const mockRAADSService = {
			getRAADSReport: jest.fn().mockResolvedValue([1, 2, 3])
		}
		
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RAADSController],
			providers: [{provide: RAADSService, useValue: mockRAADSService}]
		}).compile();

		controller = module.get<RAADSController>(RAADSController);
		service = module.get<RAADSService>(RAADSService);
	});

	it('should trigger service activation', async () => {
		await controller.getRAADSReport(1);
		expect(service.getRAADSReport).toHaveBeenCalled();
	});

	it('should produce a result', async () => {
		const result = await controller.getRAADSReport(1);
		expect(result).toStrictEqual([1, 2, 3]);
	});
});
