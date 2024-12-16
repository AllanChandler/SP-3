const URL = 'https://travel.schoolcode.dk/travel';

// Utility function to handle HTTP errors
function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() });
    }
    // If the response is empty (e.g., 204 No Content), return an empty object
    if (res.status === 204) {
        return {};
    }
    return res.json();
}

// API facade function
function apiFacade() {
    // Save the token in localStorage
    const setToken = (token) => {
        localStorage.setItem('jwtToken', token);
    };

    // Retrieve the token from localStorage
    const getToken = () => {
        return localStorage.getItem('jwtToken');
    };

    // Check if the user is logged in (i.e., if the token exists)
    const loggedIn = () => {
        return getToken() != null;
    };

    // Log the user out by removing the token from localStorage
    const logout = () => {
        localStorage.removeItem('jwtToken');
    };

    // Get user roles from the JWT token
    const getUserRoles = () => {
        const token = getToken();
        if (token != null) {
            try {
                const payloadBase64 = token.split('.')[1];
                const decodedClaims = JSON.parse(window.atob(payloadBase64));
                return decodedClaims.roles || ''; // Return empty string if roles aren't found
            } catch (error) {
                console.error("Error decoding token:", error);
                return ''; // Return empty if the token decoding fails
            }
        }
        return '';
    };

    // Check if the user has access to a specific role
    const hasUserAccess = (neededRole) => {
        const roles = getUserRoles().split(',');
        return loggedIn() && roles.some(role => role.trim() === neededRole);
    };

    // Login the user and store the token
    const login = (user, password) => {
        const options = makeOptions('POST', false, { username: user, password: password });
        return fetch(URL + '/auth/login', options)
            .then(handleHttpErrors)
            .then((res) => {
                setToken(res.token);
            })
            .catch((err) => {
                console.error("Login error:", err);
                throw err;
            });
    };

    // Register a new user and store the token if successful
    const register = (user, password) => {
        const options = makeOptions('POST', false, { username: user, password: password });
        return fetch(URL + '/auth/register', options)
            .then(handleHttpErrors)
            .then((res) => {
                console.log('User registered successfully');
                if (res.token) {
                    setToken(res.token);
                }
            })
            .catch((err) => {
                console.error("Registration error:", err);
                throw err;
            });
    };

    // Fetch data from a specific endpoint
    const fetchData = (endpoint) => {
        const options = makeOptions('GET', true);
        return fetch(URL + endpoint, options)
            .then(handleHttpErrors)
            .catch((err) => {
                console.error("Fetch error:", err);
                throw err;
            });
    };

    // Delete a destination by its ID
    const deleteDestination = (id) => {
        const options = makeOptions('DELETE', true); 
        const endpoint = `/destinations/${id}`;
        return fetch(URL + endpoint, options)
            .then(handleHttpErrors)
            .catch((err) => {
                console.error("Delete destination error:", err);
                throw err;
            });
    };

    // Delete a review by its ID
    const deleteReview = (id) => {
        const options = makeOptions('DELETE', true); 
        const endpoint = `/reviews/${id}`;
        return fetch(URL + endpoint, options)
            .then(handleHttpErrors)
            .catch((err) => {
                console.error("Delete review error:", err);
                throw err;
            });
    };

    // Delete a booking by its ID
    const deleteBooking = (id) => {
        const options = makeOptions('DELETE', true); 
        const endpoint = `/bookings/${id}`;
        return fetch(URL + endpoint, options)
            .then(handleHttpErrors)
            .catch((err) => {
                console.error("Delete booking error:", err);
                throw err;
            });
    };

    // Update a destination by its ID (PUT)
const updateDestination = (id, updatedData) => {
    const options = makeOptions('PUT', true, updatedData); 
    const endpoint = `/destinations/${id}`;
    return fetch(URL + endpoint, options)
        .then(handleHttpErrors)
        .catch((err) => {
            console.error("Update destination error:", err);
            throw err;
        });
};

// Insert a new destination (POST)
const addDestination = (newDestination) => {
    const options = makeOptions('POST', true, newDestination); 
    const endpoint = `/destinations`;
    return fetch(URL + endpoint, options)
        .then(handleHttpErrors)
        .catch((err) => {
            console.error("Add destination error:", err);
            throw err;
        });
};

    // Helper function to generate request options for fetch
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

    // Return the API methods
    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        register,
        logout,
        fetchData,
        deleteDestination,
        deleteReview,
        deleteBooking,
        updateDestination,
        addDestination,
        hasUserAccess
    };
}

// Export the facade object for use in other parts of the application
const facade = apiFacade();
export default facade;
