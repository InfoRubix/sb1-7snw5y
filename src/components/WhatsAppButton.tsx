import React from 'react';
import { MessageSquare } from 'lucide-react';
import { File } from '../types';

interface WhatsAppButtonProps {
  file: File;
  customMessage?: string;
}

export default function WhatsAppButton({ file, customMessage }: WhatsAppButtonProps) {
  const sendMessage = () => {
    const defaultMessage = 
      `*File Update: ${file.fileNumber}*\n\n` +
      `Dear ${file.clientName},\n\n` +
      `Your file is currently at the ${file.stage.replace(/_/g, ' ').toLowerCase()} stage.\n` +
      `Property: ${file.propertyDetails.address}\n` +
      `Loan Amount: RM${file.loanDetails.amount.toLocaleString()}\n\n` +
      `Please contact us if you need any clarification.`;

    const message = encodeURIComponent(customMessage || defaultMessage);
    const phone = file.stakeholders[0].contact.phone;
    
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={sendMessage}
      className="inline-flex items-center text-gray-400 hover:text-gray-500"
      title="Send WhatsApp Update"
    >
      <MessageSquare className="h-5 w-5" />
    </button>
  );
}