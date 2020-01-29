import React from 'react';
import Search from './views/components/Search/Search';
import ContactList from './views/components/ContactList/ContactList';
import './wrapper.css';
import { connect } from 'react-redux';
import { onInit, sort } from './state/ducks/search/actions';


class PhoneBook extends React.Component{

  componentDidMount(){
    const initialValues = JSON.parse(localStorage.getItem('contacts')) || []
    this.props.onInit(initialValues);
  }

  render()  {
    return(
      <div className="wrapper">
        <div className="container d-fx">
              <Search />
              <ContactList />
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = { onInit, sort };

export default connect(null, mapDispatchToProps)(PhoneBook);
  