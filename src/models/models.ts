export interface Todo {
    id: number
    title: string
    description: string
    category: string
    completed: boolean
}

export interface Action {
    type: string
    id: number
}

export interface Filter {
    status: string
    category: string
}