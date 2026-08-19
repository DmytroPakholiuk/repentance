import axios from 'axios';
import { useErrorStore } from "@/store/error";

const $axios = axios;

$axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
$axios.defaults.headers.common['Content-Type'] = 'application/json';
$axios.defaults.headers.common['Accept'] = 'application/json';
$axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + '/api/admin';
$axios.interceptors.response.use(
    function (response) {
        return response;
    },
    (error) => {
        if (error.response.status === 401 || error.response.status === 419) {
            //
        } else if (error.response.status === 422) {
            const errorStore = useErrorStore();

            errorStore.setErrors(error.response.data.errors);
        } else {
            //
        }

        return Promise.reject(error);
    }
);

export default $axios;
