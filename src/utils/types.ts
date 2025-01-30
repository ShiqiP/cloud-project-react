

export type PolicyType = {
    id?: string,
    title: string,
    description: string,
    owner: string,
    date: number,
    category: number,
    vote_user: Array<string>
}
export type AuthType = {
    id: string,
    isAuth: boolean,
    fullName: string,
    email: string,
    enc_data: string,
    hash_data: string
}

export type CategoryType = {
    id: number,
    name: string
}

export const ColorList = [
    "#1e293b", 
    "#3b82f6", 
    "#7c3aed", 
    "#84cc16", 
    "#dc2626", 
    "#f43f5e", 
    "#f97316"
]