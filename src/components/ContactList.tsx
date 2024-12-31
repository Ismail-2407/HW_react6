import React, { useState } from "react";
import { useContacts } from "../contexts/ContactsContext";

const ContactList = () => {
  const { contacts, deleteContact, editContact } = useContacts();
  const [editContactId, setEditContactId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const handleEditContact = (id: number, name: string, phone: string) => {
    setEditContactId(id);
    setEditName(name);
    setEditPhone(phone);
  };

  const handleSaveEdit = () => {
    if (editContactId !== null) {
      editContact(editContactId, editName, editPhone);
    }
    setEditContactId(null);
    setEditName("");
    setEditPhone("");
  };

  const handleCancelEdit = () => {
    setEditContactId(null);
    setEditName("");
    setEditPhone("");
  };

  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <li key={contact.id} className="contact-item">
          {editContactId === contact.id ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
              />
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <span className="contact-name">{contact.name}</span>
              <span className="contact-phone">{contact.phone}</span>
              <div className="button-container">
                <button
                  onClick={() =>
                    handleEditContact(contact.id, contact.name, contact.phone)
                  }
                >
                  Redact
                </button>
                <button onClick={() => deleteContact(contact.id)}>
                  Remove
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
