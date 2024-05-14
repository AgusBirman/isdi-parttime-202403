class Component {
    constructor(tagNameOrContainer = 'div') {
        if (typeof tagNameOrContainer === 'string')
            this.container = document.createElement(tagNameOrContainer)
        else if (tagNameOrContainer instanceof HTMLElement)
            this.container = tagNameOrContainer
        else
            throw new Error('tagNameOrContainer is not a name tago or a container')

        this.children = []
    }

    add(child) {
        if (!(child instanceof Component)) throw new TypeError('child is not component')

        this.children.push(child)

        this.container.appendChild(child.container)
    }

    setText(text) {
        this.container.innerText = text
    }

    setId(id) {
        this.container.id = id
    }

    addClass(clazz) {
        this.container.classList.add(clazz)

    }

    removeClass(clazz) {
        this.container.classList.remove(clazz)
    }

    onClick(listener) {
        this.container.addEventListener('click', listener)
    }
}