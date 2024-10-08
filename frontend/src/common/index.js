// const backendDomain = "http://localhost:8000";
const backendDomain = "https://mern-ecommerce-api-weld.vercel.app";

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
    },
    uploadProduct: {
        url : `${backendDomain}/api/users/upload-product`,
        method: "POST"
    },
    getAllProduct: {
        url : `${backendDomain}/api/users/get-products`,
        method: "GET"
    },
    updateProduct: {
        url : `${backendDomain}/api/users/update-product`,
        method: "PATCH"
    },
    getProductbyCategory: {
        url : `${backendDomain}/api/users/get-category`,
        method: "GET"
    },
    getCateggorywiseProduct : {
        url : `${backendDomain}/api/users/categorywise-product`,
        method: "POST"
    },
    getProductDetails : {
        url : `${backendDomain}/api/users/product-details`,
        method: "POST"
    },
    addToCartProduct: {
        url : `${backendDomain}/api/users/add-to-cart`,
        method: "POST"
    },
    cartCountUpdate: {
        url : `${backendDomain}/api/users/updateCart`,
        method: "GET"
    },
    addToCartViewProduct: {
        url : `${backendDomain}/api/users/cartProduct`,
        method: "GET"
    },
    updateCartItem: {
        url : `${backendDomain}/api/users/updateCartItem`,
        method: "POST"
    },
    deleteCartItem: {
        url : `${backendDomain}/api/users/deleteCartItem`,
        method: "delete"
    },
    searchProductItem: {
        url : `${backendDomain}/api/users/searchProduct`,
        method: "get"
    },
    filterProductItem: {
        url : `${backendDomain}/api/users/filter-product`,
        method: "POST"
    },
    payment: {
        url : `${backendDomain}/api/users/checkout`,
        method: "POST"
    },
    getAllOrders: {
        url : `${backendDomain}/api/users/order-list`,
        method: "GET"
    },
    deleteUser: {
        url : `${backendDomain}/api/users/deleteUser`,
        method: "delete"
    },
    forgotPasswordLink: {
        url: `${backendDomain}/api/users/send-reset-link`,
        method: "POST"
    },
    reserPassword: {
        url: `${backendDomain}/api/users`,
        method: "POST"
    },
    contactForm: {
        url: `${backendDomain}/api/users/contact`,
        method: "POST"
    }
}

export default summaryApi;
