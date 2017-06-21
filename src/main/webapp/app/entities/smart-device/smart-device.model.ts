import { BaseEntity } from './../../shared';

export class SmartDevice implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public model?: BaseEntity,
    ) {
    }
}
