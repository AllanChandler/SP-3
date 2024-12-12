const URL = 'https://travel.schoolcode.dk/travel';

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

    const getUserRoles = () => {
        const token = getToken();
        if (token != null) {
            const payloadBase64 = token.split('.')[1];
            const decodedClaims = JSON.parse(window.atob(payloadBase64));
            const roles = decodedClaims.roles;
            return roles;
        } else {
            return '';
        }
    };

    const hasUserAccess = (neededRole, loggedIn) => {
        const roles = getUserRoles().split(',');
        return loggedIn && roles.some(role => role === neededRole);
    };
    
    

    const login = (user, password) => {
        const options = makeOptions('POST', false, { username: user, password: password });
        return fetch(URL + '/auth/login', options)
            .then(handleHttpErrors)
            .then((res) => {
                setToken(res.token);
            });
    };

    const register = (user, password) => {
        const options = makeOptions('POST', false, { username: user, password: password  });
        return fetch(URL + '/auth/register', options) 
        .then(handleHttpErrors)
        .then((res) => {
            console.log('User registered successfully');
            if (res.token) {
                setToken(res.token);
            }
        })
        .catch((err) => {
            console.error("Error registering user:", err);
            throw err;
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
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        register,
        logout,
        fetchData,
        hasUserAccess
    };
}

const facade = apiFacade();
export default facade;
