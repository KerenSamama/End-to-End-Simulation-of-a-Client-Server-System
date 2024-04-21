
class FXMLHttpRequest{
    constructor(){
        //	Defines a function to be called when the request is received (loaded)
        //this.onload;

        //Defines a function to be called when the readyState property changes
        this.onreadystatechange = null;

        /**	Holds the status of the XMLHttpRequest.
            0: request not initialized
            1: server connection established
            2: request received
            3: processing request
            4: request finished and response is ready */
        this.readyState = 0;

        //Returns the response data as a string
        this.resposeText='';//reponse du serveur si c ok

        //Returns the response data as XML data
        //this.responseXML;

        /**	Returns the status-number of a request
            200: "OK"
            403: "Forbidden"
            404: "Not Found"
            For a complete list go to the Http Messages Reference */
        this.status = 0;
        
        //Returns the status-text (e.g. "OK" or "Not Found")
        this.statusText = '';

        this.async=true;
    }

    open(method, url,async,body){ // initialize fields
        this.readyState=1; // open the request
        this.method=method;
        this.url=url;
        this.async=async;
        this.body=body;
        this.async=async;
        this.readyState=0;
        this.status=0;
        this.responseText="";
       
        
    }

  
    send(data) {
        
        if (data) {
            this.body = data;
  
        }

        console.log(`Request ${this.method} sent to: ${this.url}`);
        this.readyState = 2;

        if (this.async) {
            network.sendAsync(this, this.onreadystatechange);
        } else {
            this.responseText = network.send(this);
        }
    }
};
