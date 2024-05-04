// if (userLogic.isUserLoggedIn())
//     location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Register')

const registerForm = new RegisterForm
registerForm.onRegisterSubmit((name, surname, email, username, password, passwordRepeat) => {
    try {
        userLogic.registerUser(name, surname, email, username, password, passwordRepeat)

        registerForm.clear()

        registerForm.setFeedback('user succesfully registred', 'success')

        setTimeout(() => location.href = '../login', 1000)
    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + ', please, correct it')
        else if (error instanceof MatchError)
            registerForm.setFeedback(error.message + ', please, retype them')
        else if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + ', please, enter new one')
        else
            registerForm.setFeedback('sorry, there was an error, please try again later')
    }
})

const loginLink = new Link
loginLink.setText('Login')
loginLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../login', 500)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)
