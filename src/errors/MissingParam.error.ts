export class MissingParamError extends Error {
        constructor (params: string | string[]) {
            super();

            const _params = () => {
                let arr: string[] = [];

                if (Array.isArray(params)) {
                    for (let i = 0; i < params.length; i++) {
                        arr.push(params[i]);
                    }

                    return arr;
                }

                return params;
            }

            this.name = 'MissingParamError',
            this.message = `Required param: [ ${_params()} ]`;
        }
}