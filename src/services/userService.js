import axios from "axios";
export default {
    async getUsers(url, token) {
        try {
            const responseUsers = await axios.get(`${url}/users/${token}`);
            const users = responseUsers.data
            return users.result.user;

        } catch (err) {
            console.log(err)
        }
    },
}