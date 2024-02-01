import express from 'express'
import exampleRouter from './app/example/example.router'


const router = express.Router()

router.use('/', [
    router.use('/example', exampleRouter),
])

export default router
