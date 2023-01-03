package com.example.mailserver.Logic;

import com.example.mailserver.Logic.Contacts.Contact;
import com.example.mailserver.Logic.Proxy.UserInfo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import java.util.HashMap;
import java.util.List;
//change
public class JsonEmailConverter {
    private static JsonEmailConverter instance;

    private JsonEmailConverter(){}

    public static JsonEmailConverter getInstance(){
        if(instance == null) instance = new JsonEmailConverter();
        return instance;
    }
    //user info
    public String userInfoToJson(UserInfo userInfo){
        ObjectMapper mapper = new ObjectMapper();

        String jsonStr = "";
        try {
            jsonStr += mapper.writerWithDefaultPrettyPrinter().writeValueAsString(userInfo);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        jsonStr += "\n";
        return jsonStr;
    }

    public String arrayOfUserInfoToJson(UserInfo[] usersInfo){
        String jsonStr = "[\n";
        int len = usersInfo.length;
        for(int i = 0; i < len - 1; i++){
            jsonStr += userInfoToJson(usersInfo[i]) + ",\n";
        }
        jsonStr += userInfoToJson(usersInfo[len -1]);
        jsonStr += "\n]";
        return jsonStr;
    }

    public UserInfo[] jsonToUserInfo(String jsonStr){
        Gson gson = new Gson();
        return gson.fromJson(jsonStr, UserInfo[].class);
    }
    //
    
    //contacts
    public String contactToJson(Contact contact){
        ObjectMapper mapper = new ObjectMapper();

        String jsonStr = "";
        try {
            jsonStr += mapper.writerWithDefaultPrettyPrinter().writeValueAsString(contact);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        jsonStr += "\n";
        return jsonStr;
    }
    public String arrayOfContactsToJson(Contact[] contacts) {
        String jsonStr = "[\n";
        int len = contacts.length;
        for(int i = 0; i < len - 1; i++){
            jsonStr += contactToJson(contacts[i]) + ",\n";
        }
        if(len-1 != -1){
            jsonStr += contactToJson(contacts[len -1]);
            jsonStr += "\n]";
        }
        else{
            jsonStr += "\n]";
        }
        return jsonStr;
    }
    public Contact[] jsonToContact(String jsonStr){
        Gson gson = new Gson();
        return gson.fromJson(jsonStr, Contact[].class);
    }
    //

    public String emailToJsonString(Email email){
        ObjectMapper mapper = new ObjectMapper();

        String jsonStr = "";
        try {
            jsonStr += mapper.writerWithDefaultPrettyPrinter().writeValueAsString(email);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        jsonStr += "\n";
        return jsonStr;
    }

    public String arrayOfEmailsToJson(Email[] emails){
        if(emails.length == 0) return "[]";
        String jsonStr = "[\n";
        int len = emails.length;
        for(int i = 0; i < len - 1; i++){
            jsonStr += emailToJsonString(emails[i]) + ",\n";
        }
        jsonStr += emailToJsonString(emails[len -1]);
        jsonStr += "\n]";
        return jsonStr;
    }

    public String mapOfEmailsToJson(HashMap<String, Email> emails){
        String jsonStr = "[\n";
        boolean first = true;
        for (Email email : emails.values()) {
            if(!first) jsonStr += ",\n";
            else first = false;

            jsonStr += emailToJsonString(email);
        }
        jsonStr += "\n]";
        return jsonStr;
    }

    public Email[] jsonToEmailArray(String jsonStrArray){
        Gson gson = new Gson();
        return gson.fromJson(jsonStrArray, Email[].class);
    }

    public Email JsonToEmail(String jsonStrArray){
        Gson gson = new Gson();
        return gson.fromJson(jsonStrArray, Email.class);
    }

    public HashMap<String, Email> jsonToEmailMap(String jsonStrArray){
        HashMap<String, Email> emailsMap = new HashMap<>();
        Email[] allEmails = jsonToEmailArray(jsonStrArray);
        if(allEmails != null){
            for(Email email: allEmails){
                emailsMap.put(email.getId(), email);
            }
        }
        return emailsMap;
    }

    public String[] jsonArrayToStringArray(String jsonStrArray){
        Gson gson = new Gson();
        return gson.fromJson(jsonStrArray, String[].class);
    }

    public String stringArrayToJson(String[] strArray){
        String jsonStr = "[";
        if (strArray == null || strArray.length == 0)
            return jsonStr + "]";
        for(int i = 0; i < strArray.length -1; i++){
            jsonStr += "\""+ strArray[i] + "\",";
        }
        jsonStr += "\""+ strArray[strArray.length -1] + "\"]";
        return jsonStr;
    }

    public String intListToJson(List<Integer> intArray){
        String jsonStr = "[";
        for(int i = 0; i < intArray.size()-1 ; i++){
            jsonStr += "\""+ intArray.get(i)+ "\",";
        }
        jsonStr += "\""+ intArray.get(intArray.size()-1) + "\"]";
        return jsonStr;
    }
}