import Token from '~/Helpers/Token'
import AppStorage from '~/Helpers/AppStorage'

class User {
    login({ $axios, form}){

        $axios.$post('auth/login', form)
            .then(res => this.responseAfterLogin(res))
            .catch(error => console.log(JSON.stringify(error)))
    }

    responseAfterLogin(res){

        const access_token = res.access_token
        const username = res.username
        
        if(Token.isValid(access_token)){
            AppStorage.store(username,access_token)
            console.log("token is valid " + access_token);
        }else{
            console.log("token not valid");
        }
    }

    hasToken(){
        const storedToken = AppStorage.getToken();
        if(storedToken){
            return Token.isValid(storedToken) ? true : false
        }
        return false
    }

    loggedIn(){
        return this.hasToken()
    }

    logout(){
        AppStorage.clear()
    }

    name(){
        if(this.loggedIn()){
            return AppStorage.getUser()
        }
    }

    id(){
        if(this.loggedIn()){
            const payload = Token.payload(AppStorage.getToken())
            return payload.sub
        }
    }
}

export default User = new User();