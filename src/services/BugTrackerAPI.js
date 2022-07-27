import axios from "axios";

const baseURL = 'http://greenvelvet.alwaysdata.net/bugTracker/api';
const storageToken = 'savedToken';
const storageUserId = 'savedUserId';
const savedToken = localStorage.getItem(storageToken);
const token = JSON.parse(savedToken);
const savedUser = localStorage.getItem(storageUserId);
const user = JSON.parse(savedUser);

export const BugTrackerAPI = {
    async login(username, password) {
        try {
            const responseLogin = await axios.get(`${baseURL}/login/${username}/${password}`);
            const login = responseLogin.data;
            console.log(login.result.id);
            if (login.result.status === 'done') {
                localStorage.setItem(storageToken, JSON.stringify(login.result.token));
                localStorage.setItem(storageUserId, JSON.stringify(login.result.id));
            }

            console.log(user);
            return login.result;
        } catch (err) {
    
            console.log(err)
        }
    },

    async register(username, password) {
        try {
            const responseRegister = await axios.get(`${baseURL}/signup/${username}/${password}`);
            const register = responseRegister.data;
            
            if (register.result.status === 'done') {
                localStorage.setItem(storageToken, JSON.stringify(register.result.token));
                localStorage.setItem(storageUserId, JSON.stringify(register.result.id));
            } 
            console.log(register);
            return register.result;
        } catch (err) {
            console.log(err)
        }
    },

    async logout() {
        console.log(token);
        try {
            const responseLogout = await axios.get(`${baseURL}/logout/${token}`);
            const logout = responseLogout.data;
            localStorage.removeItem(storageToken);
            console.log(logout);
            return logout.message
        } catch (err) {
            console.log(err)
        }
    },

    async getUsers() {
        try {
            const responseUsers = await axios.get(`${baseURL}/users/${token}`);
            const users = responseUsers.data
            return users.result.user;

        } catch (err) {
            console.log(err)
        }
    },

    async showListBugs(isTrue= true) {
        if (isTrue) {
            try {
                const responseBugs = await axios.get(`${baseURL}/list/${token}/${user}`);
                const lists = responseBugs.data;
                const listBugs = lists.result.bug
               
                return listBugs;
                
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const responseBugs = await axios.get(`${baseURL}/list/${token}/0`);
                const lists = responseBugs.data;
                const listBugs = lists.result.bug
               
                return listBugs;
                
            } catch (err) {
                console.log(err)
            }
        }  
    },
    async registerNewBug(data) {
        try {
            const responseNewBug = await axios.post(`${baseURL}/add/${token}/${user}`, data);
            const newBug = responseNewBug.data;
            console.log(newBug);
        } catch (err) {
            console.log(err);
        }
    },
    async deleteBug(bugId) {
        try {
            const responseDelete = await axios.get(`${baseURL}/delete/${token}/${bugId}`);
            const deleteBug = responseDelete.data;
            console.log(deleteBug);
            
        } catch (err) {
            console.log(err)
        }
    }



}