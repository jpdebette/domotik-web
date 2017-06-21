import { BaseEntity } from './../../shared';

export class CommandParameter implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public command?: BaseEntity,
    ) {
    }
}
