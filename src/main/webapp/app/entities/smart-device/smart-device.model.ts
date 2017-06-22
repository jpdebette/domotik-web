import { BaseEntity } from './../../shared';

export class SmartDevice implements BaseEntity {
    constructor(
        public id?: number,
        public ipAddress?: string,
        public name?: string,
        public model?: BaseEntity,
    ) {
    }
}
