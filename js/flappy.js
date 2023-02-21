function newElement(tagName, className) {
    const element = document.createElement(tagName)
    element.className = className
    return element
}

function Barrier(reverse = false) {
    this.element = newElement('div', 'barrier')

    const border = newElement('div', 'border')
    const body = newElement('div', 'body')

    this.element.appendChild(reverse ? body : border)
    this.element.appendChild(reverse ? border : body)

    this.setHeight = height => body.style.height = `${height}px`
}

function pairOfBarriers(height, gap, x) {
    this.element = newElement('div', 'pair-of-barriers')

    this.topBarrier = new Barrier(true)
    this.bottomBarrier = new Barrier(false)

    this.element.appendChild(this.topBarrier.element)
    this.element.appendChild(this.bottomBarrier.element)

    this.sortGap = () => {
        const topHeight = Math.random() * (height - gap)
        const bottomHeight = height - gap - topHeight
        this.topBarrier.setHeight(topHeight)
        this.bottomBarrier.setHeight(bottomHeight)
    }

    this.getX = () => parseInt(this.element.style.left.split('px')[0])
    this.setX = x => this.element.style.left = `${x}px`
    this.getWidth = () => this.element.clientWidth

    this.sortGap()
    this.setX(x)
}

// The code below is just to test the creation of the barriers
const b = new pairOfBarriers(700, 200, 400)
document.querySelector('[flappy]').appendChild(b.element)