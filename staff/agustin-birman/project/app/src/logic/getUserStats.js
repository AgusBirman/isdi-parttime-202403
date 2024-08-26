import errors from 'com/errors'
import validate from 'com/validate'

const getUserStats = (targetUserId) => {
    validate.id(targetUserId, 'targetUserId')

    return fetch(`${import.meta.env.VITE_API_URL}/users/student/${targetUserId}/stats`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    // .then(({ countActivities, countExercises, countCorrectExercises }) => ({ countActivities, countExercises, countCorrectExercises }))
                    .then(stats => stats)
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

export default getUserStats