import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Order } from './order.model';
import { ResponseWrapper } from '../shared';

@Injectable()
export class OrderService {

    private resourceUrl = 'api/orders';

    constructor(private http: Http) { }

    send(order: Order): Observable<String> {
        return this.http.post(this.resourceUrl, order).map((res: Response) => {
            return res.json();
        });
    }
}
