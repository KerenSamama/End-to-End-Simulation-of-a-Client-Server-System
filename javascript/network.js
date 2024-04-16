class network{
    serv = new server();//אובייקט מסוג סרבר
     
    //Asynchrone, data= what we want ton send to server
    //dispatcher : callback function to handle server response.
    send_to_server_async(data, dispatcher){    
        this.serv.prossess_data(data, dispatcher);
    }
    
    //synchrone, data= what we want ton send to server

    send_to_server(data){
        let result =  this.serv.prossess_data(data);
        return result;
    }
}
