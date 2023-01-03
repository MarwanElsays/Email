package com.example.mailserver.Logic.Proxy;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import com.example.mailserver.Logic.User;
import com.example.mailserver.Logic.JsonEmailConverter;
import com.example.mailserver.Logic.Session;

public class SignIn {
    private static SignIn instance;
    JsonEmailConverter jsonEmailConverter = JsonEmailConverter.getInstance();

    private SignIn(){}

    public static SignIn getInstance(){
        if(instance == null) instance = new SignIn();
        return instance;
    }

    public String signInUser(String emailAddress, String password){
        emailAddress = emailAddress.toLowerCase();
        UserInfo[] usersInfo = readUsersFile();
        for(UserInfo userInfo : usersInfo){
            if(userInfo.getEmailAddress().equalsIgnoreCase(emailAddress) && userInfo.getPassword().equals(password)){
                return Session.getInstance().addUserSession(new User(emailAddress)).toString();
            }
        }
        return "false";
    }

    private UserInfo[] readUsersFile(){
        String jsonStr = "";
        try {
            File myObj = new File("mailserver/Database/users.json");
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
              jsonStr += myReader.nextLine();
            }
            myReader.close();
          } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
          }
          return jsonEmailConverter.jsonToUserInfo(jsonStr);
      }
    
    
}
