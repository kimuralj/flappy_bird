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

function Barriers(height, width, gap, space, notifyPoint) {
    this.pairs = [
        new pairOfBarriers(height, gap, width),
        new pairOfBarriers(height, gap, width + space),
        new pairOfBarriers(height, gap, width + space * 2),
        new pairOfBarriers(height, gap, width + space * 3)
    ]

    const displacement = 3
    this.animate = () => {
        this.pairs.forEach(pair => {
            pair.setX(pair.getX() -  displacement)

            if (pair.getX() < -pair.getWidth()) {
                pair.setX(pair.getX() + space * this.pairs.length)
                pair.sortGap()
            }

            const middle = width / 2
            const crossedMiddle = (pair.getX() + displacement >= middle) && (pair.getX() < middle)
            crossedMiddle && notifyPoint()
        })
    }
}

function Bird(gameHeight) {
    let flying = false

    this.element = newElement('img', 'bird')
    this.element.src = 'imgs/bird.png'

    this.getY = () => parseInt(this.element.style.bottom.split('px')[0])
    this.setY = y => this.element.style.bottom =`${y}px`

    window.onkeydown = e => flying = true
    window.onkeyup = e => flying = false

    this.animate = () => {
        const newY = this.getY() + (flying ? 8 : -5)
        const maxHeight = gameHeight - this.element.clientHeight

        if (newY <= 0) this.setY(0)
        else if (newY >= maxHeight) this.setY(maxHeight)
        else this.setY(newY)
    }

    this.setY(gameHeight / 2)
}

// Testing moving barriers and bird
const barriers = new Barriers(700, 1200, 200, 400)
const bird = new Bird(700)
const gameArea = document.querySelector('[flappy]')
gameArea.appendChild(bird.element)
barriers.pairs.forEach(pair => gameArea.appendChild(pair.element))
setInterval(() => {
    barriers.animate()
    bird.animate()
}, 20)