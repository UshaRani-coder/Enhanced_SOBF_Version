const emailTemplates = [
   {
        subject: '🎉 Confirmation of Your Registration.',
        message: `Dear {{username}},

We are thrilled to confirm your registration for {{eventName}}! Thank you for signing up, and we can't wait to see you there.

Here are the event details:

- Event Name: {{eventName}}
- Date: {{eventDate}}
- Time: {{eventStartTime}} - {{eventEndTime}}
- Location: {{eventLocation}}

If you have any questions or need further information, feel free to reach out to us at soulofbraj@gmail.com.

Best regards,
Soul Of Braj Federation`,
      },
      {
        subject: '⏰ Reminder: Event is Just Around the Corner!',
        message: `Dear {{username}},

This is a friendly reminder that {{eventName}} is just around the corner! We are excited to have you join us.

Here are the event details:

- Event Name: {{eventName}}
- Date: {{eventDate}}
- Time: {{eventStartTime}} - {{eventEndTime}}
- Location: {{eventLocation}}

Please make sure to arrive on time and bring any necessary materials.

If you have any questions, feel free to contact us at soulofbraj@gmail.com.

Looking forward to seeing you there!

Best regards,
Soul Of Braj Federation`,
      },
      {
        subject:
          '🙏 Thank you for attending the SOBF event! Stay connected with us for more initiatives.',
        message: `Dear {{username}},

Thank you for attending {{eventName}}! We hope you had a great time and found the event informative and enjoyable.

We would love to hear your feedback. Please take a moment to fill out our feedback form:

[Feedback Form Link]

If you have any questions or need further information, feel free to reach out to us at soulofbraj@gmail.com.

Best regards,
Soul Of Braj Federation`,
      },
];

export default emailTemplates;
