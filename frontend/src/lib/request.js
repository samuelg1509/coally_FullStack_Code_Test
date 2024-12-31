
import configureStore from '@/store/store'

class sendRequest {
    #header
    #path
    #id
    constructor(path,header,id=null){
        this.#path = path;
        this.#header = header;
        this.#id = id;
    }

    send = async(method,data=null)=>{
        const store = configureStore.getState();
        const url = this.#id ? `http://localhost:8080/api/${this.#path}/${this.#id}` : `http://localhost:8080/api/${this.#path}`
        let payload = {
            method
        };
        const token = store.token['token'];
        switch(this.#header){
            case 'basic':
                payload['headers'] = new Headers({
                    "Authorization": `Basic ${ btoa(`${data.username}:${data.password}`)}`
                });
                break;
            default:
                payload['headers'] = new Headers({
                    "Authorization": `Bearer ${token}`
                  });
                  if(data) payload['data'] = data;
                break;
        };
        const response = await fetch(url, payload);
      
        const json = await response.json();
        return json;
    
    };
} 

export {sendRequest}