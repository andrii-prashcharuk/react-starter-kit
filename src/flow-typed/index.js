// @flow
declare module CSSModule {
    declare var exports: { [key: string]: string };
}

declare var module : {
    hot : {
        accept(): void;
    };
};

declare type AxiosSagaResult<T> = { data: T };
