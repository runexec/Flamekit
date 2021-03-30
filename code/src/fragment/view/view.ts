export class View extends String {
    constructor({file_name} : {file_name: string}) {
        super({file_name: file_name});
        return this;
    }
}