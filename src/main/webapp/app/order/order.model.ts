import { BaseEntity } from './../shared';

export class Order {
    constructor(
        public smartDevice?: BaseEntity,
        public text?: string
    ) {
    }
}
