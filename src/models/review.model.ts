import Client from "./client.model"

export default class Review {
    id: number = 0
    client?: Client
    date?: Date
    text?: string
    assessment: number = 1
}