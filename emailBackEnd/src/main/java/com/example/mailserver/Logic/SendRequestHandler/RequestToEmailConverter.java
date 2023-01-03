package com.example.mailserver.Logic.SendRequestHandler;

import com.google.gson.Gson;

public class RequestToEmailConverter {
    private static RequestToEmailConverter instance;

    private RequestToEmailConverter(){}

    public static RequestToEmailConverter getInstance(){
        if(instance == null) instance = new RequestToEmailConverter();
        return instance;
    }

    public EmailRequestData jsonToData(String requestStr){
        Gson gson = new Gson();
        return gson.fromJson(requestStr, EmailRequestData.class);
    }
}
