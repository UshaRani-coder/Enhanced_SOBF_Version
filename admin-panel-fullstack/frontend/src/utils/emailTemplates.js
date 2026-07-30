const emailTemplates = [
  {
    subject: '🎉 Confirmation of Your Registration',
    message: `Dear {{username}},

We are thrilled to confirm your registration for {{eventName}}!

Here are the event details:

- Event Name: {{eventName}}
- Date: {{eventDate}}
- Time: {{eventTime}}
- Location: {{eventLocation}}

We can't wait to see you there.

Best regards,
Soul Of Braj Federation`,
  },

  {
    subject: '⏰ Reminder: Event is Just Around the Corner!',
    message: `Dear {{username}},

This is a friendly reminder that {{eventName}} is coming soon.

Event Details:

- Date: {{eventDate}}
- Time: {{eventTime}}
- Location: {{eventLocation}}

Looking forward to seeing you!

Best regards,
Soul Of Braj Federation`,
  },

  {
    subject: '🙏 Thank you for attending SOBF Event',
    message: `Dear {{username}},

Thank you for attending {{eventName}}.

We hope you enjoyed the event.

We would love your feedback.

Best regards,
Soul Of Braj Federation`,
  },
];

export default emailTemplates;
