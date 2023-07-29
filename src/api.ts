function apiBaseUrl() {
    switch (window.location.hostname) {
        case "www.wety.org":
        case "wety.org":
            return "https://api.wety.org/";
        default:
            // to test only on the machine running this client server, uncomment
            // this line and comment the line below it:
            // return "http://127.0.0.1:3000/";

            // to test on other devices on your network, comment the above line
            // and replace the below line with the local IP address for the
            // machine running this client server, e.g.:
            return "http://192.168.0.88:3000/";
    }
}

export const API_BASE_URL = apiBaseUrl();
