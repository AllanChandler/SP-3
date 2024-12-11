const URL = 'https://travel.schoolcode.dk/travel'; // Your base URL

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
}

function apiFacade() {
    const setToken = (token) => {
        localStorage.setItem('jwtToken', token);
    };

    const getToken = () => {
        return localStorage.getItem('jwtToken');
    };

    const loggedIn = () => {
        return getToken() != null;
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
    };

    const register = (username, password) => {
        const options = makeOptions('POST', false, { username, password });
        return fetch(URL + '/auth/register', options)
            .then(handleHttpErrors)
            .then(() => {
                // Handle success here (optional, e.g., show a success message)
            })
            .catch((err) => {
                console.error('Registration error:', err);
                throw err; // Handle error (e.g., username already taken)
            });
    };

    const login = (user, password) => {
        const options = makeOptions('POST', false, { username: user, password: password });
        return fetch(URL + '/auth/login', options)
            .then(handleHttpErrors)
            .then((res) => {
                setToken(res.token); // Now using 'res' to save the token
            });
    };

    const fetchData = (endpoint) => {
        const options = makeOptions('GET', true);
        return fetch(URL + endpoint, options)
            .then(handleHttpErrors)
            .catch((err) => {
                throw err;
            });
    };

    const makeOptions = (method, addToken, body) => {
        const opts = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json',
            },
        };
        if (addToken && loggedIn()) {
            opts.headers['Authorization'] = `Bearer ${getToken()}`;
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    };

    return {
        setToken,
        getToken,
        loggedIn,
        logout,
        register,
        login,
        fetchData,
    };
}

const facade = apiFacade();
export default facade;
