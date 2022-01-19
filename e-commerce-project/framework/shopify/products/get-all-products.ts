
const fetchAPI = async () => {
    const url = "https://jsonplaceholder.typicode.com/todos"

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        return { data }
    } catch (err) {
        console.error(err)
    }
    
}

const getAllProducts = async (): Promise<any> => {
    try {
        const products = await fetchAPI()
        if (products) return products.data
    } catch (err) {
        console.error(err)
    }
    
}

export default getAllProducts