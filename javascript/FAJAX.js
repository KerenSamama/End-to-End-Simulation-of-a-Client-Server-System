
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


    //Returns specific header information
    getResponseHeader(){

    }

    
  //JAI CHANGER LA OPEN
    open(method, url, async){ // initialize fields
        this.readyState=1; // open the request
        this.method=method;
        this.url=url;
        this.async=async;
        
    }

    //Sends the request to the server
    //Used for GET requests
 /*    send(){
        

         console.log(`Requet ${this.method} send to : ${this.json}`);
         this.readyState = 2;
        if(this.async){
            Network.sendAsync(this, this.onreadystatechange)
        }
        else{
            responseText = Network.send(this)
        }
    }

    

    //Sends the request to the server.
    //Used for POST requests
    send(string){
        this.body = JSON.parse(string);
        this.send();
    } */
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

    //Adds a label/value pair to the header to be sent
    setRequestHeader(){

    }
};
/* -----------------------------------------------------------------------------------*/

// class FXMLHttpRequest{
//     response=null;
//     responseText="";
//     readyState=0;//connection state 
//     status=0; // response status  
//     onload=null;// verify response status and return the response
//     async=true;
//     method='';
//     url='';

//      open(method, url, async){ // initialize fields
//         this.readyState=1;
//         this.async=async;
//         this.method=method;
//         this.url=url;
       
//         if(this.async==true){ //Asynchrone
//             this.onload=(e) => {
//                 if (this.readyState === 4) {
//                      if (this.status === 200) {
//                        return this.response;
//                 } 
//                 else {
//                   console.log(this.status);
//                 }
//               }
//             };

//          }
//         else{
//             this.onload =()=>{
    
//             if (this.status === 200) {
//                 return this.response;}
//             else{
//                 console.log(this.status)
//             }
//         };
//         }

//     }

//     send(body){ //send request to network
//     var fxmlhttp=null;
//     fxmlhttp=Network.send(body, this); 
//     this.readyState=fxmlhttp.readyState;
//     this.status=fxmlhttp.status;
//     this.response=fxmlhttp.response;

    
     
        
//     }
    
// }
