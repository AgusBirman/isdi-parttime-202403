import jwt from '../util/jsonwebtoken-promised.js'

import logic from '../logic/index.js'

import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload


                const { activityId, sentence, translate } = req.body
                try {
                    logic.createOrderSentence(userId, activityId, sentence, translate)
                        .then(() => res.status(201).send())
                        .catch(error => next(error))
                } catch (error) {
                    next(error)
                }
            })
            .catch(error => next(new CredentialsError(error.message)))
    } catch (error) {
        next(error)
    }
}