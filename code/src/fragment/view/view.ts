export class View extends String {
    constructor({fragment_string} : {fragment_string: string}) {
        super(fragment_string);
        return this;
    }
}