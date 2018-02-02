const map = []

process.addListener('message', ({name, time, id}) =>
    time
        ? map[id] = setTimeout(() =>
            console.warn('function ' + name + ' is slower than ' + time + ' ms'),
            time
        )
        : clearTimeout(map[id])
)

process.send({})

