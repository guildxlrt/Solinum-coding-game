import mongoose, { Document, Schema } from 'mongoose';

export interface IPoint {
    name : string;
    email : string;
    position : [number, number];
    address : string,
    interests : {
        distribution : boolean,
        douche : boolean,
        wifi : boolean
    };
    status : boolean;
    state : boolean | null;
}

export interface IPointModel extends IPoint, Document {}

const PointSchema: Schema = new Schema(
    {
        name : { type : String, required: true },
        email : { type : String, required: true },
        position : { type : Array, required: true },
        address : { type : String, required: true },
        interests : { type : Object, required: true },
        status : { type : Boolean, default: false },
        state : { type : Boolean, default : null }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IPointModel>('point', PointSchema);