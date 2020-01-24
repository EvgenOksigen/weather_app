import React from "react";
import { connect } from "react-redux";
import Info from "../Info/Info";
import "./search_style.css";
import { find, sort, resetContacts } from "../../state/ducks/search/actions";

const Search = ({ findItems, data, find, resetContacts }) => {
  //
  const inputHandle = e => {
    find(e.target.value);
    sort(findItems);
  };

  return (
    <div className="search-container">
      <Info />
      <div className="search">
        <input
          name="contactName"
          placeholder="Contact"
          onChange={inputHandle}
        />
      </div>
      <hr />
      {findItems && findItems.map((el, index) => <p key={index}>{el}</p>)}
      {findItems && (
        <button
          onClick={() => {
            resetContacts();
          }}
        >
          reset
        </button>
      )}
    </div>
  );
};

const mapStateToProps = ({ contacts: { data, findItems } }) => ({
  data,
  findItems
});

const mapDispatchToProps = { find, sort, resetContacts };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
