import express, { Application } from 'express'
import cors from 'cors'
import figlet from 'figlet'
import router from './router'

const port: string | number = process.env.PORT || 3000
const app: Application = express()

app.use(express.json())
app.use(cors({
    origin: '*'
}))
app.use(router)

app.get('/health', (req, res) => {
    res.send('OK')
})

try {
    app.listen(port, () => {
        figlet('-------\nAPI REST\n-------', (err, data) => {
            if (err) {
                console.log('Something went wrong...')
                console.dir(err)
                return
            }
            console.log(data)
            console.log(`Server running on port ${port}`)
        })
    })
} catch (error) {
    console.log(error)
}