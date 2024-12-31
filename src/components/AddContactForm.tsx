import React, { useState } from "react";
import { useContacts } from "../contexts/ContactsContext";

const AddContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { addContact } = useContacts();

  const handleAddContact = () => {
    addContact(name, phone);
    setName("");
    setPhone("");
  };

  return (
    <div className="add-contact-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleAddContact}>Add</button>
    </div>
  );
};

export default AddContactForm;
