import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CommandParameter } from './command-parameter.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CommandParameterService {

    private resourceUrl = 'api/command-parameters';

    constructor(private http: Http) { }

    create(commandParameter: CommandParameter): Observable<CommandParameter> {
        const copy = this.convert(commandParameter);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(commandParameter: CommandParameter): Observable<CommandParameter> {
        const copy = this.convert(commandParameter);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<CommandParameter> {
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

    private convert(commandParameter: CommandParameter): CommandParameter {
        const copy: CommandParameter = Object.assign({}, commandParameter);
        return copy;
    }
}
