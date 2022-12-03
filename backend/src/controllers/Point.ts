import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import Point from '../models/Point';

interface IInterests {
    distribution : boolean,
    douche : boolean,
    wifi : boolean
}

function addInterests (interests : IInterests) {
    if (interests.distribution) interests.distribution = true
    else interests.distribution = false
    if (interests.douche) interests.douche = true
    else interests.douche = false
    if (interests.wifi) interests.wifi = true
    else interests.wifi = false
}

function setUpdate (body : any, updates : any) {
    if (body.name) updates.name = body.name
    if (body.position && body.address) {
        updates.position = body.position
        updates.address = body.address
    }

    if ((body.interests.distribution === false) ||
    (body.interests.distribution === true)) {
        updates.interests.distribution = body.interests.distribution
    }
    if ((body.interests.douche === false) ||
    (body.interests.douche === true)) {
        updates.interests.douche = body.interests.douche
    }
    if ((body.interests.wifi === false) ||
    (body.interests.wifi === true)) {
        updates.interests.wifi = body.interests.wifi
    }    
}

function testInterests (dist : boolean | undefined, douche : boolean | undefined, wifi : boolean | undefined ) {
    if (dist === true) return true
    if (douche === true) return true
    if (wifi === true) return true
    else return false
}

const newPoint = (req : Request, res : Response, next : NextFunction) => {
    //--------Verification email
    const emailVal = new RegExp(/^([a-z0-9._-]+)@([a-z0-9]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/, 'g')
    if (emailVal.test(req.body.email)) {

        // REQUETE INVALIDE
        if (req.body.name === '') {
            return res.status(400).json({ error : "Vous devez mettre un intitule"})
        }
        if (testInterests(
                req.body.interests.distribution,
                req.body.interests.douche,
                req.body.interests.wifi
            ) === false
        ) {
            return res.status(400).json({ error : "Vous devez cocher au moins un interet"})
        }
        
        // REQUETE VALIDE
        if (!(req.body.name === '') &&
        testInterests(
            req.body.interests.distribution,
            req.body.interests.douche,
            req.body.interests.wifi
        ) === true ) {
            // enregistrement du lieu
            const { name, email, position, address, interests } = req.body;
            const point = new Point({
                _id : new mongoose.Types.ObjectId(),
                name,
                email,
                position,
                address,
                interests
            })

            addInterests(point.interests)
            
            return point
            .save()
            .then((point) => res.status(201).json({ 
                message : 'Le point a ete cree : ',
                point
            }))
            .catch(error => res.status(500).json({ error }))     
        }
        // ERREUR SERVEUR
    else {
        return res.status(400).json({ error : "Erreur lors de la soumission ..."})
    }   
    }
    else {
        return res.status(400).json({ error : "l'email doit etre au format email"})

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
                    interests : {
                        distribution : point.interests.distribution,
                        douche : point.interests.douche,
                        wifi : point.interests.wifi
                    }
                }

                // Update Object
                setUpdate(req.body, updates)
                point.set(updates)

                // REQUETE INVALIDE
                if (req.body.name === '') {
                    return res.status(400).json({ error : "L'intitule ne peut pas etre vide"})
                }
                if (testInterests(
                    updates.interests.distribution,
                    updates.interests.douche,
                    updates.interests.wifi
                ) === false) {
                    return res.status(400).json({ error : "Le lieu doit avoir au moins un interet"})
                }
                if (
                    req.body.address === ""  ||
                    typeof req.body.position[0] !== 'number' ||
                    typeof req.body.position[1] !== 'number'
                ) {
                    return res.status(400).json({ error : "L'adresse doit etre valide"})
                }
                // REQUETE VALIDE
                else {
                    return point
                    .save()
                    .then((point) => {
                        res.status(200).json({
                            message : 'le point a ete modifie :',
                            point
                        })
                    })
                    .catch((error) => res.status(500).json({ error }))
                }
                
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