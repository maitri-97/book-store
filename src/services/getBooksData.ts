import { API_KEY, BASE_API_URL } from "../mock/mock";

export const getBooksData = async () => {
    let res: any;
    try {
        await fetch(`${BASE_API_URL}lists/overview?api-key=${API_KEY}`)
            .then((response) => response.json())
            .then(json => res = json).catch((error) => console.log(error))
        return res?.results;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}