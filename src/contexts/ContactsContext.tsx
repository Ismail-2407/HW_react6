import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface Contact {
  id: number;
  name: string;
  phone: string;
}

interface ContactsContextType {
  contacts: Contact[];
  addContact: (name: string, phone: string) => void;
  deleteContact: (id: number) => void;
  editContact: (id: number, name: string, phone: string) => void;
}

const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined
);

export const ContactsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name: string, phone: string) => {
    if (name.trim() === "" || phone.trim() === "") {
      alert("enter a name and phone number");
      return;
    }
    const newContact: Contact = {
      id: Date.now(),
      name,
      phone,
    };
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const editContact = (id: number, name: string, phone: string) => {
    if (name.trim() === "" || phone.trim() === "") {
      alert("enter a name and phone number");
      return;
    }
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, name, phone } : contact
    );
    setContacts(updatedContacts);
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
        deleteContact,
        editContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
};
