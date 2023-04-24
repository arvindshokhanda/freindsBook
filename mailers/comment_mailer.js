const nodemMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    let htmlString  = nodemMailer.renderTemplate({comment: comment},'/comments/new_comments.ejs');

    console.log('inside new comment', comment);
    nodemMailer.transporter.sendMail({
            from: '',
            to: comment.user.email,
            subject: "new comment published",
            html: htmlString

        },
        (err, info) =>{
            if(err){
                console.log('Error in sending Emails', err);
                return;
            }
            console.log('Message sent!', info);
            return;
        }
    );
}