class RegisterForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass('RegisterForm')

        const nameField = new Field('name', 'text', 'Name')
        nameField.setPlaceholder('name')

        const surnameField = new Field('surname', 'text', 'Surname')
        surnameField.setPlaceholder('surname')

        const emailField = new Field('email', 'email', 'E-mail')
        emailField.setPlaceholder('name@example.com')

        const usernameField = new Field('username', 'text', 'Username')
        usernameField.setPlaceholder('username')

        const passwordField = new Field('password', 'password', 'Password')
        passwordField.setPlaceholder('password')

        const passwordRepeatField = new Field('password', 'password', 'Password repeat')
        passwordRepeatField.setPlaceholder('repeat password')

        const submitButton = new SubmitButton('Register')

        this.add(nameField)
        this.add(surnameField)
        this.add(emailField)
        this.add(usernameField)
        this.add(passwordField)
        this.add(passwordRepeatField)
        this.add(submitButton)

        this.onSubmit(event => {
            event.preventDefault()

            const name = registerForm.getName()
            const surname = registerForm.getSurname()
            const email = registerForm.getEmail()
            const username = registerForm.getUsername()
            const password = registerForm.getPassword()
            const passwordRepeat = registerForm.getPasswordRepeat()

            this.onRegisterSubmitListener(name, surname, email, username, password, passwordRepeat)
        })
    }

    getName() {
        const nameField = this.children[0]

        return nameField.getValue()
    }

    getSurname() {
        const surnameField = this.children[1]

        return surnameField.getValue()
    }

    getEmail() {
        const emailField = this.children[2]

        return emailField.getValue()
    }

    getUsername() {
        const usernameField = this.children[3]

        return usernameField.getValue()
    }

    getPassword() {
        const passwordField = this.children[4]

        return passwordField.getValue()
    }

    getPasswordRepeat() {
        const passwordFieldRepeat = this.children[5]

        return passwordFieldRepeat.getValue()
    }

    onRegisterSubmit(listener) {
        this.onRegisterSubmitListener = listener
    }
}