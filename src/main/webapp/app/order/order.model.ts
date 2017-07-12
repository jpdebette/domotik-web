import { BaseEntity } from './../shared';

export class Order {
    constructor(
        public smartDevice?: BaseEntity,
        public command?: BaseEntity
    ) {
    }
}
