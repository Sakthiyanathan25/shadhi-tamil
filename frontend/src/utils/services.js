export const baseurl = "http://localhost:8080/api"

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    })

    const data = await response.json();
    if (!response.ok) {
        let message;

        if (data?.message) {
            message = data.message
        }
        else {
            message = data
        }

        return { error: true, message }
    }
    return data
}

export const getRequest = async (url) => {
    const response = await fetch(url)

    const data = await response.json()
    if (!response.ok) {
        let message = "An error occured...";

        if (data?.message) {
            message = data.message
        }

        return { error: true, message }
    }
    return data
}

export const putRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body
    })

    const data = await response.json();
    if (!response.ok) {
        let message;
        if (data?.message) {
            message = data.message;
        }
        else {
            message = data
        }

        return { error: true, message }
    }
    return data;
}

export const deleteRequest = async (url) => {
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json()
    if (!response.ok) {
        let message;
        if (data?.message) {
            message = data.message;
        }
        else {
            message = data
        }

        return { error: true, message }
    }
    return data;
}
