import React, { useState, useEffect } from 'react';

const ContactForm = (props) => {
  const initialFieldValues = {
    fullname: '',
    mobile: '',
    email: '',
    address: ''
  }

  const [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId === '') {
      setValues({
        ...initialFieldValues
      })
    } else {
      setValues({
        ...props.contactObjects[props.currentId]
      })
    }
  }, [props.currentId, props.contactObjects]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    props.addOrEdit(values);
  }

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input 
          onChange={handleInputChange} 
          className="form-control" 
          placeholder="Full Name" 
          name="fullname" 
          value={values.fullname} 
        />
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-mobile-alt"></i>
            </div>
          </div>
          <input 
            onChange={handleInputChange} 
            className="form-control" 
            placeholder="Mobile" 
            name="mobile" v
            alue={values.mobile} 
          />
        </div>

        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-envelope"></i>
            </div>
          </div>
          <input 
            onChange={handleInputChange} 
            className="form-control" 
            placeholder="E-mail" 
            name="email" 
            value={values.email} 
          />
        </div>

      </div>
        <div className="form-group">
          <textarea 
            name="address" 
            className="form-control" 
            placeholder="Address"
            value={values.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <input type="submit" value={props.currentId === '' ? "Save" : "Update"} className="btn btn-primary btn-block" />
        </div>
    </form>
  );
}

export default ContactForm;