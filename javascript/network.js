
const network = {
    serv: new Server(),
     
    //Asynchrone, data= what we want to send to server
    //dispatcher : callback function to handle server response.
    sendAsync: function(data, callback){    
        this.serv.hendleRequestAsync(data, callback);
    },
    
    //synchrone, data= what we want ton send to server

    send: function(data){
        let result =  this.serv.hendleRequestSync(data);
        return result;
    }
}
