import React, { useEffect, useMemo, useState } from 'react';
import { formatDate } from '../../utils/formatDate.js';

const EmailComposer = ({ onTemplateChange, eventDetails = {}, user }) => {
  const {
    eventName = '{{eventName}}',
    eventDate = '{{eventDate}}',
    eventStartTime = '{{eventStartTime}}',
    eventEndTime = '{{eventEndTime}}',
    eventLocation = '{{eventLocation}}',
  } = eventDetails;

  const formattedDate =
    eventDate === '{{eventDate}}' ? eventDate : formatDate(eventDate);

  const emailTemplates = useMemo(
    () => [
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
    ],
    [],
  );

  const previewMessage = (text) => {
    return text
      .replaceAll('{{username}}', user?.username || '{{username}}')
      .replaceAll('{{eventName}}', eventName)
      .replaceAll('{{eventDate}}', formattedDate)
      .replaceAll('{{eventStartTime}}', eventStartTime)
      .replaceAll('{{eventEndTime}}', eventEndTime)
      .replaceAll('{{eventLocation}}', eventLocation);
  };

  const [selectedTemplate, setSelectedTemplate] = useState(emailTemplates[0]);

  const [preview, setPreview] = useState(
    previewMessage(emailTemplates[0].message),
  );

  useEffect(() => {
    setPreview(previewMessage(selectedTemplate.message));

    // Pass the original template (with placeholders) to the parent
    onTemplateChange?.(selectedTemplate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedTemplate,
    user,
    eventName,
    formattedDate,
    eventStartTime,
    eventEndTime,
    eventLocation,
  ]);

  const handleTemplateChange = (e) => {
    const template = emailTemplates.find((t) => t.subject === e.target.value);

    setSelectedTemplate(template);
  };

  const handleMessageChange = (e) => {
    const updatedTemplate = {
      ...selectedTemplate,
      message: e.target.value,
    };

    setSelectedTemplate(updatedTemplate);
    setPreview(previewMessage(e.target.value));
  };

  return (
    <div className="mt-4">
      <label className="block text-gray-700 text-sm mb-1">
        Select Email Template:
      </label>

      <select
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 cursor-pointer"
        value={selectedTemplate.subject}
        onChange={handleTemplateChange}
      >
        {emailTemplates.map((template) => (
          <option key={template.subject} value={template.subject}>
            {template.subject}
          </option>
        ))}
      </select>

      <label className="block text-gray-700 text-sm mb-1">
        Customize Email Message:
      </label>

      <textarea
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
        rows={12}
        value={preview}
        onChange={handleMessageChange}
      />
    </div>
  );
};

export default EmailComposer;
