import validate from 'com/validate'
import errors, { SystemError } from '../../../com/errors'

const checkCompleteActivity = activityId => {
    validate.id(activityId, 'activityId')

    return fetch(`${import.meta.env.VITE_API_URL}/activity/${activityId}/result`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server not found') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server not found') })
                    .then(result => result)
            }

            return response.json()
                .catch(() => { throw new SystemError('server not found') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default checkCompleteActivity