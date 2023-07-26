import axios from 'axios';
import store from '../Redux/Store';

const tokenAxios = axios.create();

tokenAxios.interceptors.request.use(request => {

    request.headers = {
        "authorization": store.getState().userReducer?.user?.token
    };

    return request;
});

export default tokenAxios;