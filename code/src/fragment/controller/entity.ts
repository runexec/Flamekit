import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as Enums from '../../enum';
import * as Interface_ from '../../interface'

let Message: {info: (message: string) => void};
let Is: { isValidCreateFragment: (x: Enums.LineType) => boolean };
let CreateTextReplacement: {create: Function};

export const create = ({ input_line }: { input_line: Interface_.ICreateFragmentLine }) => {
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