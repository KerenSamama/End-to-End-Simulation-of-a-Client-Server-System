class FXMLHttpRequest{
    constructor(){
        //	Defines a function to be called when the request is received (loaded)
        this.onload;

        //Defines a function to be called when the readyState property changes
        this.onreadystatechange;

        /**	Holds the status of the XMLHttpRequest.
            0: request not initialized
            1: server connection established
            2: request received
            3: processing request
            4: request finished and response is ready */
        this.readyState;

        //Returns the response data as a string
        this.resposeText;

        //Returns the response data as XML data
        this.responseXML;

        /**	Returns the status-number of a request
            200: "OK"
            403: "Forbidden"
            404: "Not Found"
            For a complete list go to the Http Messages Reference */
        this.status;
        
        //Returns the status-text (e.g. "OK" or "Not Found")
        this.statusText;
    }

    //Cancels the current request
    abort(){

    }

    //Returns header information
    getAllResponseHeaders(){

    }

    //Returns specific header information
    getResponseHeader(){

    }
/** Specifies the request
    method: the request type GET or POST
    url: the file location
    async: true (asynchronous) or false (synchronous)
    user: optional user name
    psw: optional password */
    open(method, url, async, user, psw){

    }

    //Sends the request to the server
    //Used for GET requests
    send(){

    }

    //Sends the request to the server.
    //Used for POST requests
    send(string){

    }

    //Adds a label/value pair to the header to be sent
    setRequestHeader(){

    }
};