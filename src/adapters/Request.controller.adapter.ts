import { RequestController } from "../controllers/Request.controller";

export interface RequestControllerAdapterInterface {
    _dc_url: string;
    makeRequest(url: string, method: 'post' | 'get', options?: any): Promise<any>
}

export class RequestControllerAdapter implements RequestControllerAdapterInterface {
    private _requestController: RequestControllerAdapterInterface;
    
    _dc_url: string;

    constructor () {
        this._requestController = new RequestController();
        this._dc_url = this._requestController._dc_url;
    }

    makeRequest(url: string, method: "post" | "get", options?: any): Promise<any> {
        return this._requestController.makeRequest(url, method, options);
    }
}