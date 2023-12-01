import { Test, TestingModule } from "@nestjs/testing";
import { BDI13Controller } from "./bdi13.controller";
import { BDI13Service } from "./bdi13.service";

describe('BDI13Controller', () =>  {
	let controller: BDI13Controller;
	let service: BDI13Service;

	beforeEach(async () => {

		const mockBDI13Service = {
			getBDI13Report: jest.fn().mockResolvedValue([1, 2, 3])
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [BDI13Controller],
			providers: [{provide: BDI13Service, useValue: mockBDI13Service}]
		}).compile();

		controller = module.get<BDI13Controller>(BDI13Controller);
		service = module.get<BDI13Service>(BDI13Service);
	});

	it('should trigger service activation', async () => {
		await controller.getBDI13Report(1);
		expect(service.getBDI13Report).toHaveBeenCalled();
	});

	it('should produce a result', async () => {
		const result = await controller.getBDI13Report(1);
		expect(result).toStrictEqual([1, 2, 3]);
	});
});
