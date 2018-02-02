import * as cp from 'child_process'
import * as path from 'path'
import freePort from './freePort'

const workerPath = path.join(__dirname, 'worker')

const slowGuardBuilder: any = guard => (time, callback) => function(...rest) {
    const id = slowGuardBuilder.id || 1
    slowGuardBuilder.id = id + 1

    guard.send({name: callback.name, time, id})

    console.time('duration')
    const result = callback.apply(this, [rest])
    console.timeEnd('duration')

    guard.send({id})

    return result
}

export default async () => {
    let child

    if (child)
        return Promise.resolve(child)

    const port = await freePort(10000)

    return new Promise(res => {
                child = cp.fork(workerPath, [], {
                    execArgv: ['--inspect=' + port],
                })

                child.once('message', () => res(child = slowGuardBuilder(child)))
        }
    )
}
