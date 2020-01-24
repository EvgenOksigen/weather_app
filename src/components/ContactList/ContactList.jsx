import React from "react";
import { connect } from "react-redux";
import "./contactList_style.css";
import { sort, deleteContact } from "../../state/ducks/search/actions";
import { useEffect } from "react";

const ContactList = ({ data, sort, deleteContact }) => {
  return (
    <div className="contactList-container">
      <h3> Contact List</h3>
      <div className="">
        {data.map((el, index) => (
          <div key={index} className="d-fx">
            <p key={el.id}>
              {index + 1} {el.name} : {el.phoneNumber}
            </p>
            <button
              onClick={() => {
                deleteContact(el.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ contacts: { data } }) => ({ data });

const mapDispatchToProps = { sort, deleteContact };

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
