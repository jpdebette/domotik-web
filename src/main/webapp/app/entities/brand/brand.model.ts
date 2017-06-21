import { BaseEntity } from './../../shared';

export class Brand implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
