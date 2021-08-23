
export interface ICreateNote {
    "userId": number
    "noteTitle": string
    "noteContent": string
    "isPinned": boolean
    "backgroundColor": string
    "createdAt": Date
    "isDeleted": boolean
    "label": string
}