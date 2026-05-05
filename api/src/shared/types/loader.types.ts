import type { Application } from "express";

export type TRouteModule = Array<IModule>;

export interface IModule {
    register: (app: Application, prefix: string) => void;
    prefix: string;
}
