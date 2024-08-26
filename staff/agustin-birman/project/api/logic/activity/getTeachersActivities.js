import { MatchError, NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import { Activity, User } from '../../data/index.js'

const getTeachersActivities = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return User.find({ student: userId }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(teachers => {

                    const teacherIds = teachers.map(teacher => teacher._id)

                    return Activity.find({ teacher: { $in: teacherIds } })
                        .populate({ path: 'teacher', select: 'username' })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(activities => {

                            const transformedActivities = activities.map(activity => {
                                const activityObj = activity.toObject()
                                activityObj.id = activityObj._id
                                delete activityObj._id

                                if (activityObj.teacher) {
                                    activityObj.teacherUsername = activityObj.teacher.username
                                }

                                return activityObj
                            })
                            return transformedActivities
                        }) //TODO chequear como devolver esto correctamente
                })
        })
}

export default getTeachersActivities