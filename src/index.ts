import slowGuard from './slowGuard'

const job = slow_guard => {
    const generate = n => {
        const ar = []
        for(let i = 0; i < n; i++)
            ar.push(Math.random())

        return ar
    }

    Array.prototype.sort = slow_guard(100, Array.prototype.sort)

    generate(1000).sort()
    generate(10000).sort()
    generate(100000).sort()
    generate(200000).sort()
    slow_guard(100, generate)(90000)
}

slowGuard()
    .then(job)