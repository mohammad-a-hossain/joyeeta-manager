
export const API =  'http://localhost:7070/api'

export const generatePublicUrl =(filename)=>{
    return `${API}/uploadsProducts/${filename}`
}