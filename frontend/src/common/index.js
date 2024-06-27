const backendDomain = "http://localhost:5000";

const summaryApi = {
    signUp : {
        url: `${backendDomain}/api/users/register`,
        method: "post"
    },
    login: {
        url: `${backendDomain}/api/users/login`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/users/get-current-user`,
        method: "get"
    },
    logoutUser: {
        url:  `${backendDomain}/api/users/logout`,
        method: "post"
    },
    allUsers: {
        url: `${backendDomain}/api/users/all-users`,
        method: "get"
    },
    editUserDetails: {
        url: `${backendDomain}/api/users/update-profile`,
        method: "PATCH"
    }
}

export default summaryApi;