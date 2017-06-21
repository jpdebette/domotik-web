import { BaseEntity } from './../../shared';

export class Model implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public brand?: BaseEntity,
    ) {
    }
}
