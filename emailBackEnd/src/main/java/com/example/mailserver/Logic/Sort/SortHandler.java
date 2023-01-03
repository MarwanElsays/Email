package com.example.mailserver.Logic.Sort;

import java.time.LocalDateTime;
import com.example.mailserver.Logic.Email;

public class SortHandler {

    public Email[] sortEmails(Email[] emails, int sortType /* 0:priority  1:date */, int identifier) {
        if(sortType == 0) return sortingPriority(emails,identifier);
        else return  sortingDate(emails,identifier);
    }


    public Email[] sortingPriority(Email[] emails,int identifier /* 0 : least priority  1:most priority */) {
        Email[] sortedEmails = new Email[emails.length];

        int numOFEmails = emails.length ;

        //copying the array of Emails
        for(int i=0 ; i<numOFEmails ; i++){
                sortedEmails[i] = emails[i];
        }

        Email temp; // for swapping
        for(int i=0 ; i<numOFEmails ; i++){
            for(int j=0 ; j<numOFEmails-1 ; j++){
                int priorityOne = 0;
                int priorityTwo = 0;
                // priority of first email in order to integer 
                if(sortedEmails[j].getPriority().toLowerCase().equals("urgent")){
                     priorityOne = 3;
                }
                else if(sortedEmails[j].getPriority().toLowerCase().equals("high")){
                     priorityOne = 2;
                }
                else if(sortedEmails[j].getPriority().toLowerCase().equals("normal")){
                     priorityOne = 1;
                }
                else if(sortedEmails[j].getPriority().toLowerCase().equals("low")){
                     priorityOne = 0;
                }

                // priority of second email in order to integer
                if(sortedEmails[j+1].getPriority().toLowerCase().equals("urgent")){
                     priorityTwo = 3;
                }
                else if(sortedEmails[j+1].getPriority().toLowerCase().equals("high")){
                     priorityTwo = 2;
                }
                else if(sortedEmails[j+1].getPriority().toLowerCase().equals("normal")){
                     priorityTwo = 1;
                }
                else if(sortedEmails[j+1].getPriority().toLowerCase().equals("low")){
                     priorityTwo = 0;
                }

                if(priorityOne > priorityTwo) {
                    temp = sortedEmails[j];
                    sortedEmails[j] = sortedEmails[j+1];
                    sortedEmails[j+1] = temp;
                }
            }
        }

        if (identifier == 1){

            Email[] mostPriority = new Email[sortedEmails.length];

            for(int i=0 ; i<numOFEmails ; i++){
                mostPriority[numOFEmails-1-i] = sortedEmails[i] ;
            }

            return mostPriority;
        }

        return sortedEmails;
    }


    public Email[] sortingDate(Email[] emails, int identifier /* 0 : newer in date  1:older in date */) {
        Email[] sortedEmails = new Email[emails.length];

        int numOFEmails = emails.length ;

        //copying the array of Emails
        for(int i=0 ; i<numOFEmails ; i++){
                sortedEmails[i] = emails[i];
        }

        Email temp; // for swapping
        for(int i=0 ; i<numOFEmails ; i++){
            for(int j=0 ; j<numOFEmails-1 ; j++){
                char[] parsingFormat1 = sortedEmails[j].getTime().toCharArray();
                parsingFormat1[10] = 'T';
                String email1 = String.valueOf(parsingFormat1);
                LocalDateTime emailOne = LocalDateTime.parse(email1);
                char[] parsingFormat2 = sortedEmails[j+1].getTime().toCharArray();
                parsingFormat2[10] = 'T';
                String email2 = String.valueOf(parsingFormat2);
                LocalDateTime emailTwo = LocalDateTime.parse(email2);
                if(emailOne.isBefore(emailTwo)){
                    temp = sortedEmails[j];
                    sortedEmails[j] = sortedEmails[j+1];
                    sortedEmails[j+1] = temp;
                }
            }
        }

        if (identifier == 1){
            Email[] older = new Email[sortedEmails.length];
            for(int i=0 ; i<numOFEmails ; i++){
               older[numOFEmails-1-i] = sortedEmails[i] ;
            }
            return older;
        }

        return sortedEmails;
    }

    // public static void main(String[]args){
       
       
    //         Queue<String> receivers = new LinkedList<String>();
    //         Queue<String> attachments = new LinkedList<String>();
    //         receivers.add("testREC@g");
    //         attachments.add("attach1");
    //         Email[] test = new Email[4];
    //         // // public Email(String id, String sender, Queue<String> receivers, String title, String body, String time, Queue<String> attachments)
    //         Email email1 = new Email("1", "test@g", receivers, "titletest", "bodytest", "2019-04-29 22:32:38.536", attachments, "urgent");
    //         Email email2 = new Email("2", "test@g", receivers, "titletest", "bodytest", "2019-04-22 22:33:38.536", attachments, "low");
    //         Email email3 = new Email("3", "test@g", receivers, "titletest", "bodytest", "2019-04-30 22:35:38.536", attachments, "high");
    //         Email email4 = new Email("4", "test@g", receivers, "titletest", "bodytest", "2019-04-12 22:34:38.536" , attachments, "urgent");
            
    //         test[0] = email1;
    //         test[1] = email2;
    //         test[2] = email3;
    //         test[3] = email4;

    //         Email[] sorted = new Email[4];

    //         sorted = sortEmails(sorted, test,1,0);
    //         for(int i=0 ; i<4 ; i++){
    //             System.out.println(sorted[i].getId());
    //         }
        
    // }
    
}
