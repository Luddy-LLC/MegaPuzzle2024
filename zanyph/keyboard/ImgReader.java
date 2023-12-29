// Not necessary anymore :P
// But still cool :D

import javax.imageio.ImageIO;
import java.awt.image.*;
import java.io.*;
import java.util.HashMap;

public class ImgReader{


    public static void main(String[] args) throws IOException{

        HashMap<Character, Character> replacements = new HashMap<>();
        replacements.put('1', '!');
        replacements.put('2','@');
        replacements.put('3','#');
        replacements.put('4','$');
        replacements.put('5','%');
        replacements.put('6','^');
        replacements.put('7','&');
        replacements.put('8','*');
        replacements.put('9','(');
        replacements.put('0',')');

        BufferedImage img = ImageIO.read(new File("./assets/pepsi.png"));

        for(int x=0; x<img.getWidth(); ++x){
            for(int y=0; y<img.getHeight(); ++y){
                int color = img.getRGB(x,y);
                String blue = Integer.toString(color & 0xff);
                String green = Integer.toString((color & 0xff00) >> 8);
                String red = Integer.toString((color & 0xff0000) >> 16);

                for(char key : replacements.keySet()){
                    red = red.replace(key, replacements.get(key));
                    green = green.replace(key, replacements.get(key));
                    blue = blue.replace(key, replacements.get(key));
                }

                System.out.printf("%s,%s,%s ", red, green, blue);
                System.out.print(" ");
            }
            System.out.println();
        }
    }

}