import * as Is from './is';
import * as Message from '../../util/message';
import * as Interface_ from '../../interface'
import * as CreateTextReplacement from './enitity/createTextReplacement';
export * as CreateTextReplacement from './enitity/createTextReplacement';

export const create = ({ input_line }: { input_line: Interface_.ICreateFragmentLine }) => {
	const { line, line_number, line_type } = input_line;
	if (line && Is.isValidCreateFragment(line_type)) {
		const display_number = line_number + 1;
		Message.info(`Fragment found on line number: ${display_number}`);
		return CreateTextReplacement.create({ line: line, line_type: line_type, line_number: line_number });
	}
};