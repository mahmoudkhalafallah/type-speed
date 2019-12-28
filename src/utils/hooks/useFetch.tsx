export const useFetch = (url: string, makeCall: boolean) => {
    if (makeCall) {
        return fetch(url).then(res => {
            return res.json()
        })
    }
    return Promise.resolve(new Response(JSON.stringify({})))
}