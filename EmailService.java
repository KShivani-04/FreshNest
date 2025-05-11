package Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import Model.User;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(User user, String siteURL) {
        String subject = "Please verify your registration";
        String senderName = "Grocery Store";
        String verifyURL = siteURL + "/verify?code=" + user.getVerificationCode();

        String content = "Dear User,\n"
                + "Please click the link below to verify your registration:\n"
                + verifyURL + "\n"
                + "Thank you,\n"
                + senderName;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("your_email@example.com");
        message.setTo(user.getEmail());
        message.setSubject(subject);
        message.setText(content);

        mailSender.send(message);
    }
}
