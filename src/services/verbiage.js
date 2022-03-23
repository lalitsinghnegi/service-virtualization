// Tool tip text are kept in this file

export const Verbs ={
    title :{
        method:"HTTP defines methods to indicate the desired action to be performed on the identified resource.eg. GET, POST, PUT, DELETE",
        path:"EndPoint, which would append to the destination domain.The path should be as per standard URI scheme",
        query:"Query parameter, Key/value pair send as query string with the request.",
        requestHeader:"Header section of request define the operating parameters of an HTTP transaction, eg. Accept: text/html,Content-Type: application/JSON.",
        requestBody:"Any parameter(s) which you want to send in body of the request, eg. {'transaction_id':1234}.",
        status:"Status code which would come in the response, eg. 200 - success , 501-internal error, 301-Moved Permanently, 403- Forbidden.",
        responseHeader:"Header section of response define the operating parameters of an HTTP transaction, eg. Accept: text/html,Content-Type: application/JSON.",
        responseBody:"Response Body contains the resource data that was requested by the client.",
        delays:"Apply delays to responses based on URL pattern matching or HTTP method. This is done using a regular expression to match against the URL, a delay value in milliseconds, and an optional HTTP method value.",
        btn_Edit_SaveChanges:"Saves the changes temporarily before Finish & Submit.",
        btn_Edit_Preview:"Preview the config file before Finish & Submit.",
        btn_Edit_FinishSubmit:"Saves the config changes to the database.",
        btn_Edit_AddEndPoints:"Add more endpoints to the config file.",
        btn_Create_AddEndPoints:"Save the changes temporarily and add more endpoints to the config file.",
        btn_Create_PreviewAll:"Preview the config file before Finish & Submit.",
        btn_Create_SaveStub:"Saves the config changes to the database."
    }
}