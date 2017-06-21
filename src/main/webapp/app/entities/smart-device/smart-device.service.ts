import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SmartDevice } from './smart-device.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SmartDeviceService {

    private resourceUrl = 'api/smart-devices';

    constructor(private http: Http) { }

    create(smartDevice: SmartDevice): Observable<SmartDevice> {
        const copy = this.convert(smartDevice);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(smartDevice: SmartDevice): Observable<SmartDevice> {
        const copy = this.convert(smartDevice);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<SmartDevice> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(smartDevice: SmartDevice): SmartDevice {
        const copy: SmartDevice = Object.assign({}, smartDevice);
        return copy;
    }
}
