import { BaseEntity } from './../../shared';

export class Command implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public model?: BaseEntity,
    ) {
    }
}
