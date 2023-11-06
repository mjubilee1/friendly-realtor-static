import React, { useState } from 'react';
import { Modal, Button } from '../components/UI';
import { realtimeDb, useAuthContext } from '../context';
import { useAppStore } from '../stores';
import { ref, push, set } from 'firebase/database';
import { Timestamp } from 'firebase/firestore';

export const SendMessageModal = ({ userID }: { userID: string }) => {
  const [messageText, setMessageText] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const { user } = useAuthContext();
  const { openLoginModal } = useAppStore();

  const handleSendMessage = async (event) => {
    setSaving(true);
    try {
      const senderMessagesRef = ref(realtimeDb, `users/${user.id}/messages/${userID}`);
      const recipientMessagesRef = ref(realtimeDb, `users/${userID}/messages/${user.id}`);

      const newMessageRef = push(senderMessagesRef);
      const newMessageRecipientMessageRef = push(recipientMessagesRef);

      const timestamp = Timestamp.now();

      const messageData = {
        senderId: user.id,
        content: messageText,
        timestamp: timestamp,
      };

      await set(newMessageRef, messageData);
      await set(newMessageRecipientMessageRef, messageData);

      setMessageText('');
      setOpen(false);
    } catch (error) {
      console.log('Error sending a message to the user.', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      className="bg-white text-black p-4"
      closeXClassName="text-black"
      trigger={
        <Button
          color="secondary"
          className="mt-2"
          onClick={() => {
            if (user) {
              setOpen(true);
            } else {
              openLoginModal();
            }
          }}
        >
          Send Message
        </Button>
      }
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Send A Message</h2>
        <textarea
          className="w-full h-32 p-4 border-black border-2"
          onChange={(event) => {
            setMessageText(event.target.value);
          }}
        />
        <Button
          color="secondary"
          className="text-white"
          loading={saving}
          onClick={handleSendMessage}
        >
          Send Message
        </Button>
      </div>
    </Modal>
  );
};
