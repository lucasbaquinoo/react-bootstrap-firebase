import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import fireDB from '../firebase';

const Contacts = () => {
  const [contactObjects, setContactObjects] = useState({});

  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    fireDB.child('contacts').on('value', snapshot => {
      if (snapshot.val() != null) {
        setContactObjects({
          ...snapshot.val()
        })
      }
    })
  }, []);

  const addOrEdit = obj => {
    if (currentId === '') {
      fireDB.child('contacts').push(
        obj,
        err => {
          if (err) {
            console.log(err);
          }
        }
      )
    } else {
      fireDB.child(`contacts/${currentId}`).set(
        obj,
        err => {
          if (err) {
            console.log(err);
          } else {
            setCurrentId('');
          }
        }
      )
    }
    
  }

  const onDelete = (key) => {
    if (window.confirm('Are you sure to delete this record?')) {
      fireDB.child(`contacts/${key}`).remove(
        err => {
          if (err) {
            console.log(err);
        }
      }
    )
  }
}

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Contact Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ContactForm {...({ addOrEdit, currentId, contactObjects })} />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>Full Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(contactObjects).map(id => {
                  return <tr>
                    <td>{contactObjects[id].fullname}</td>
                    <td>{contactObjects[id].mobile}</td>
                    <td>{contactObjects[id].email}</td>
                    <td>
                      <a className="btn text-primary" onClick={() => {setCurrentId(id)}}>
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                      <a className="btn text-danger" onClick={() => onDelete(id)}>
                        <i className="far fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Contacts;