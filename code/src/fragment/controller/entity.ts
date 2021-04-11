import 'reflect-metadata';
import { singleton, container } from 'tsyringe';

type LineType = number;

interface FragmentLine {
	line: string | undefined,
	line_number: number,
	line_type: LineType
}

let Is: { isValidCreateFragment: (x: LineType) => boolean };
let Message: { info: (message: string) => void };
let CreateTextReplacement: { create: Function };

export const create = ({ input_line }: { input_line: FragmentLine }) => {
	Is = container.resolve('fragment.Is');
	Message = container.resolve('Util.Message.info');
	CreateTextReplacement = container.resolve('fragment.CreateTextReplacement');
	const { line, line_number, line_type } = input_line;
	if (line && Is.isValidCreateFragment(line_type)) {
		const display_number = line_number + 1;
		Message.info(`Fragment found on line number: ${display_number}`);
		return CreateTextReplacement.create({ line: line, line_type: line_type, line_number: line_number });
	}
};

@singleton()
export class Injection {
	create = create
}