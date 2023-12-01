import { Test, TestingModule } from "@nestjs/testing";
import { ASRSController } from "./asrs.controller";
import { ASRSService } from "./asrs.service";

describe('ASRSController', () => {
	let controller: ASRSController;
  	let service: ASRSService;

	beforeEach(async () => {
		// mocking ASRSService
		const mockASRSService = {
			getASRSReport: jest.fn().mockResolvedValue([1, 2, 3])
		};

		// creating a testing module
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ASRSController],
			providers: [{provide: ASRSService, useValue: mockASRSService}]
		}).compile();

		controller = module.get<ASRSController>(ASRSController);
		service = module.get<ASRSService>(ASRSService);
	});

	it('should trigger service activation', async () => {
		await controller.getASRSReport(1);
		expect(service.getASRSReport).toHaveBeenCalled();
	});

	it('should return a result', async () => {
		const result = await controller.getASRSReport(1);
		expect(result).toStrictEqual([1, 2, 3]); 
	});
});
