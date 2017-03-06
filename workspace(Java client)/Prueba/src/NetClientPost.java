import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.xml.bind.DatatypeConverter;

import Enc.Test;



public class NetClientPost {

	public static void main(String[] args) throws NoSuchAlgorithmException, InvalidKeySpecException, InvalidKeyException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException {

	  try {

		URL url = new URL("http://localhost:8000/user/login");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setDoOutput(true);
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "application/json");

		String input = "{\"username\":\"USERNAME\", \"password\":\"PASSWORD\"}";
        PublicKey publicKey = Test.readPublicKey("/home/carlos/Desktop/public_key.der");
        byte[] message = input.getBytes("UTF8");
        byte[] secret = Test.encrypt(publicKey, message);
        System.out.println(new String(secret, "UTF8"));
        String input2 = "{\"data\": " + "\"" + DatatypeConverter.printBase64Binary(secret) + "\"" + "}";
        
		OutputStream os = conn.getOutputStream();
		os.write(input2.getBytes());
		os.flush();

		BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
		String output;
		System.out.println("Output from Server .... \n");
		while ((output = br.readLine()) != null) {
			System.out.println(output);
		}

		conn.disconnect();

	  } catch (MalformedURLException e) {

		e.printStackTrace();

	  } catch (IOException e) {

		e.printStackTrace();

	 }

	}

}
