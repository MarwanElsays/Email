package com.example.mailserver.Logic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


public class Session {
    private static Session instance;
    private static HashMap<Integer, User> sessions = new HashMap<Integer, User>();
    private Integer userId = 0;
    private List<Integer> ids = new ArrayList<Integer>();
    JsonEmailConverter jsonEmailConverter = JsonEmailConverter.getInstance();

    private Session(){}

    public static Session getInstance(){
        if(instance == null) instance = new Session();
        return instance;
    }
    
    public Integer addUserSession(User user){
        sessions.put(userId, user);
        ids.add(userId);
        return userId++;
    }

    public void deleteUserSession(Integer id){
        sessions.remove(id);
        ids.remove(Integer.valueOf(id));
    }

    public HashMap<Integer, User> getAllSessions(){
        return sessions;
    }

    public String getIds(){
        String strJson = jsonEmailConverter.intListToJson(ids);
        return strJson;
    }
    public User getUser(Integer key){
        return sessions.get(key);
    }
}
