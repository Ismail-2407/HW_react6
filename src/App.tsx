import React from "react";
import "./App.css";
import { ContactsProvider } from "./contexts/ContactsContext";
import ContactList from "./components/ContactList";
import AddContactForm from "./components/AddContactForm";

function App() {
  return (
    <ContactsProvider>
      <div className="app-container">
        <h1>Phone book</h1>
        <AddContactForm />
        <ContactList />
      </div>
    </ContactsProvider>
  );
}

export default App;
