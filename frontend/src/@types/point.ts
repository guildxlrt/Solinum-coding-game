
export interface IPoint {
    _id : string;
    name : string;
    email : string;
    position : [number, number];
    address : string;
    interests : {
        distribution : boolean,
        douche : boolean,
        wifi : boolean
    };
    status : boolean | null;
    state : boolean | null;
    createdAt : string;
    updatedAt : string;
}

export interface INewPoint {
    name : string;
    email : string;
    position : void | number[];
    address : string;
    interests : {
        distribution : boolean,
        douche : boolean,
        wifi : boolean
    };
}
