
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
    status : boolean;
    state : boolean;
    createdAt : string;
    updatedAt : string;
}

export interface IFormDatas {
    name : string;
    email : string;
    position : [number, number];
    address : string;
    interests : {
        distribution : boolean,
        douche : boolean,
        wifi : boolean
    };
}