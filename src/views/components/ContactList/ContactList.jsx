import React from "react";
import { connect } from "react-redux";
import "./contactList_style.css";
import {
  deleteContact,
  edit,
  editContact
} from "../../../state/ducks/search/actions";

const ContactList = ({ data, deleteContact, edit, editContact }) => {
  //

  const EditContact = ({ contact, id }) => {
    //
    const nameInputHandler = e => {
      editContact(id, e.target.value, "n");
    };

    const phoneInputHandler = e => {
      editContact(id, e.target.value, "p");
    };

    return (
      <>
        <input
          name="name"
          placeholder={`${contact.name}`}
          onChange={nameInputHandler}
        ></input>
        <input
          name="phone"
          placeholder={`${contact.phoneNumber}`}
          onChange={phoneInputHandler}
        ></input>
      </>
    );
  };

  return (
    <div className="contactList-container">
      <h3> Contact List</h3>
      <div className="">
        {data.map((contact, index) => (
          <div key={index} className="contact">
            {!contact.edit && (
              <p key={contact.id}>
                {index + 1} {contact.name} : {contact.phoneNumber}
              </p>
            )}

            {contact.edit && <EditContact contact={contact} id={contact.id} />}

            <div className="contact-buttons">
              <button
                onClick={() => {
                  contact.edit ? edit(contact.id) : edit(contact.id);
                }}
              >
                {contact.edit ? (
                  <i className="fas fa-save"></i>
                ) : (
                  <i className="fas fa-edit"></i>
                )}
              </button>
              <button
                onClick={() => {
                  deleteContact(contact.id);
                }}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ contacts: { data } }) => ({ data });

const mapDispatchToProps = { deleteContact, edit, editContact };

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
