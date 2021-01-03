// @flow
declare var module : {
    hot : {
        accept(): void;
    };
};

declare type AxiosSagaResult<T> = { data: T };
