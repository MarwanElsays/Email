import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class Mainmenu implements ActionListener,MouseListener{

 JFrame frame = new JFrame();
 ImageIcon imageicon;
 JButton myButton = new JButton("NEW GAME");
 JButton myButton1 = new JButton("LOAD GAME");
 JButton myButton2 = new JButton("EXIT");
 
 
 Mainmenu(){

 imageicon = new ImageIcon("ticimage.jpg");

  myButton.setBounds(240,100,210,70);
  myButton.setFont(new Font("Helvetica",Font.BOLD,20));
  myButton.setForeground(Color.BLACK);
  myButton.setBackground(Color.YELLOW);
  myButton.setFocusable(false);
  myButton.addActionListener(this);
  myButton.addMouseListener(this);

  myButton1.setBounds(240,200,210,70);
  myButton1.setFont(new Font("Helvetica",Font.BOLD,20));
  myButton1.setForeground(Color.BLACK);
  myButton1.setBackground(Color.YELLOW);
  myButton1.setFocusable(false);
  myButton1.addActionListener(this);
  myButton1.addMouseListener(this);

  myButton2.setBounds(240,300,210,70);
  myButton2.setFont(new Font("Helvetica",Font.BOLD,20));
  myButton2.setForeground(Color.BLACK);
  myButton2.setBackground(Color.YELLOW);
  myButton2.setFocusable(false);
  myButton2.addActionListener(this);
  myButton2.addMouseListener(this);

  JLabel label =new JLabel();
  label.setIcon(imageicon);
  label.setBounds(-100,0,800,480);
 

  frame.add(myButton);
  frame.add(myButton1);
  frame.add(myButton2);
  frame.add(label);
 
  frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
  frame.setBounds(300, 150, 700, 480);
  frame.setLayout(null);
  frame.setVisible(true);
  //frame.getContentPane().setBackground(Color.CYAN);
  
 }

 @Override
 public void actionPerformed(ActionEvent e) {
  
  if(e.getSource()==myButton) {
   frame.dispose();
   TicTacToe tictactoe = new TicTacToe();
  }
  if(e.getSource()==myButton2) {
    System.exit(0);
   }
 }

@Override
public void mouseClicked(MouseEvent e) {
    // TODO Auto-generated method stub
    
}

@Override
public void mousePressed(MouseEvent e) {
    // TODO Auto-generated method stub
    
}

@Override
public void mouseReleased(MouseEvent e) {
    // TODO Auto-generated method stub
    
}

@Override
public void mouseEntered(MouseEvent e) {

    if(e.getSource()==myButton)
    {
        myButton.setBackground(Color.RED);
        myButton.setForeground(Color.WHITE);
    }
    if(e.getSource()==myButton1)
    {
        myButton1.setBackground(Color.RED);
        myButton1.setForeground(Color.WHITE);
    }
    if(e.getSource()==myButton2)
    {
        myButton2.setBackground(Color.RED);
        myButton2.setForeground(Color.WHITE);
    }
       
}

@Override
public void mouseExited(MouseEvent e) {
    if(e.getSource()==myButton)
    {
        myButton.setBackground(Color.YELLOW);
        myButton.setForeground(Color.BLACK);
    }
    if(e.getSource()==myButton1)
    {
        myButton1.setBackground(Color.YELLOW);
        myButton1.setForeground(Color.BLACK);
    }
    if(e.getSource()==myButton2)
    {
        myButton2.setBackground(Color.YELLOW);
        myButton2.setForeground(Color.BLACK);
    
    }      
    
}

}
    

