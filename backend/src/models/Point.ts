import mongoose, { Document, Schema } from 'mongoose';

export interface IPoint {
    name : string;
    email : string;
    address : [number, number];
    interest : [number, number, number];
    status : boolean;
    state : boolean;
}

export interface IPointModel extends IPoint, Document {}

const PointSchema: Schema = new Schema(
    {
        name : { type : String, required: true },
        email : { type : String, required: true },
        address : { type : Array, required: true },
        interest : { type : Array, required: true },
        status : { type : Boolean, default: false },
        state : { type : Boolean, default : null }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IPointModel>('point', PointSchema);