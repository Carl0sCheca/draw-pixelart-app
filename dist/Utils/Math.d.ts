import { DrawApp } from '../index';
export type Vector = {
    x: number;
    y: number;
};
export declare const VectorZero: Vector;
export declare function VectorAdd(vector1: Vector, vector2: Vector): Vector;
export declare function VectorMidPoint(vector1: Vector, vector2: Vector): Vector;
export declare function VectorSub(vector1: Vector, vector2: Vector): Vector;
export declare function VectorDiv(vector1: Vector, vector2: Vector): Vector;
export declare function VectorAbs(vector: Vector): Vector;
export declare function VectorTrunc(vector: Vector): Vector;
export declare function VectorFloor(vector: Vector): Vector;
export declare function VectorCeil(vector: Vector): Vector;
export declare function VectorMaxComponent(vector: Vector): number;
export declare function VectorHypot(vector1: Vector, vector2: Vector): number;
export declare function Clamp(value: number, min: number, max: number): number;
export declare function VectorClamp(vector: Vector, min: Vector, max: Vector): Vector;
export declare function DiscretizationPosition(discretePosition: Vector, canvas: DrawApp): Vector;
export declare function DiscretizationDataPosition(position: Vector, canvas: DrawApp): Vector;
export declare function Lerp(v0: number, v1: number, t: number): number;
export declare function LerpSteps(drawApp: DrawApp, firstPosition: Vector, lastPosition: Vector, callback: CallableFunction): void;
export declare function RandomNumber(min: number, max: number): number;
export declare function CheckRange(position: Vector, minPosition: Vector, maxPosition: Vector): boolean;
