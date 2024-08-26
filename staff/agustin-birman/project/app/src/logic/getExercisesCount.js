import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const getExercisesCount = activityId => {
    validate.id(activityId, 'activityId')

    return fetch(`${import.meta.env.VITE_API_URL}/exercise/${activityId}/count`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(count => count)
            }
            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default getExercisesCount