import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { NestResponse } from "./nest-response";

@Injectable()
export class TransformerResponseInterceptor implements NestInterceptor {

    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(
                map((responseController: NestResponse) => {
                    if (responseController instanceof NestResponse) {
                        const contxt = context.switchToHttp();
                        const response = contxt.getResponse();
                        const { headers, status, body } = responseController;

                        const nameHeaders = Object.getOwnPropertyNames(headers);

                        nameHeaders.forEach(nameHeaders => {
                            const valueHeader = headers[nameHeaders];
                            this.httpAdapter.setHeader(response, nameHeaders, valueHeader);
                        });

                        this.httpAdapter.status(response, status);
                        return body;
                    }

                    return responseController;
                })
            );
    }

}