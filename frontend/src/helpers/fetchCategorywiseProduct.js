import summaryApi from "../common"

const fetchCategorywiseProduct = async(category) => {
    const response = await fetch(summaryApi.getCateggorywiseProduct.url, {
        method: summaryApi.getCateggorywiseProduct.method,
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            category : category
        })

    })

    const dataResponse = await response.json() 

    return dataResponse
}

export default fetchCategorywiseProduct