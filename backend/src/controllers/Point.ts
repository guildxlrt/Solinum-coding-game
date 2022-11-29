import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import Point from '../models/Point';

const newPoint = (req : Request, res : Response, next : NextFunction) => {

    //--------Verification email
    const emailVal = new RegExp(/^([a-z0-9._-]+)@([a-z0-9]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/, 'g');
    

    if (emailVal.test(req.body.email)) {
        const { name, email, position, address, interests } = req.body;

        const point = new Point({
            _id : new mongoose.Types.ObjectId(),
            name,
            email,
            position,
            address,
            interests
        })

        return point
            .save()
            .then((point) => res.status(201).json({ 
                message : 'Le point a ete cree : ',
                point
            }))
            .catch(error => res.status(500).json({ error }))
    }
    else {
        return res.status(400).json({
            message : "l'email doit etre au format email : ",
            exemples : " sasha93@yahoo.com, paul.fortune@laposte.fr, solinum-service_users@kanap.co.fr ..."
        })
    }
};

const getAll = (req : Request, res : Response, next : NextFunction) => {
    return Point.find()
    .then(points => res.status(200).json(points))
    .catch(error => res.status(500).json({ error }))
};

const updatePoint = (req : Request, res : Response, next : NextFunction) => {
    const pointId = req.body.pointId

    return Point.findById(pointId)
    .then((point) => {
        if (point) {
            const updates = {
                name : point.name,
                position : point.position,
                address : point.address,
                interests : point.interests
            }

            if (req.body.name) updates.name = req.body.name
            if (req.body.position && req.body.address) {
                updates.position = req.body.position
                updates.address = req.body.address
            }
            if (req.body.interests) updates.interests = req.body.interests
                        
            point.set(updates)

            return point
                .save()
                .then((point) => {
                    res.status(200).json({
                        message : 'le point a ete modifie :',
                        point
                    })
                })
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message : "Point not found"})
        }
    })
    .catch(error => res.status(500).json({ error }))
};

const changeState = (req : Request, res : Response, next : NextFunction) => {
    const pointId = req.body.pointId

    return Point.findById(pointId)
    .then((point) => {
        if (point) {
            const updates =  { state : req.body.state, status : point.status }
            
            switch (req.body.state) {
                case true :
                    updates.status = true
                    updates.state = true
                    point.set(updates)

                    return point
                        .save()
                        .then((point) => {
                            res.status(200).json({
                                message : 'le point a ete modifie :',
                                point
                            })
                        })
                        .catch((error) => res.status(500).json({ error }));
                case false :
                    updates.status = false
                    updates.state = false
                    point.set(updates)

                    return point
                        .save()
                        .then((point) => {
                            res.status(200).json({
                                message : 'le point est marque incomplet :',
                                point
                            })
                        })
                        .catch((error) => res.status(500).json({ error }));
                default :
                    return res.status(400).json({ message : 'Bad request : state must be True or False' })
            }
        }
        else {
            res.status(404).json({ message : "Point not found"})
        }
    })
    .catch(error => res.status(500).json({ error }))
};

export default { newPoint, getAll, updatePoint, changeState }