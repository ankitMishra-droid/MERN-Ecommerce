const backendDomain = "http://localhost:5000";

const summaryApi = {
    signUp : {
        url: `${backendDomain}/api/users/register`,
        method: "post"
    }
}

export default summaryApi;