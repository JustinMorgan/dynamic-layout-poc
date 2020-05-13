export interface IAlert {
    id: number;
    name: string;
}

export class Alert implements IAlert {
    id: number;
    name: string;

    constructor({id, name}) {
        this.id = id;
        this.name = name;
    }
}
