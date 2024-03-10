import React from 'react';

const AddAddressForm = ({ handleSubmit, setAddressName, setStreet, setPincode, setCity, setNewAddress, style='block' }) => {

    const validate = (e) => {

        e.preventDefault()

        var val_name = document.getElementById("add-name")
        var val_city = document.getElementById("add-city")
        var val_street = document.getElementById("add-street")
        var val_pincode = document.getElementById("add-pincode")
        var val_address = document.getElementById("add-address")

        let name_valid = false;
        let city_valid = false;
        let street_valid = false;
        let pincode_valid = false;
        let address_valid = false;

        if (val_name.value === '') {
            document.getElementById('errName').innerText = 'This field cannot be empty!'
            name_valid = false
          } else if (val_name.value.length< 4) {
            document.getElementById('errName').innerText = 'Name should have atleast 4 characters.'
            name_valid = false   
          }  else {
            document.getElementById('errName').style.display = 'none'
              name_valid=true
          }

          if (val_city.value === '') {
            document.getElementById('errCity').innerText = 'This field cannot be empty!'
            city_valid = false
          } else if (val_city.value.length< 3) {
            document.getElementById('errCity').innerText = 'Name should have atleast 3 characters.'
            city_valid = false   
          }  else {
            document.getElementById('errCity').style.display = 'none'
              city_valid=true
          }
        
          if (val_street.value === '') {
            document.getElementById('errStreet').innerText = 'This field cannot be empty!'
            street_valid = false
          } else if (val_street.value.length< 4) {
            document.getElementById('errStreet').innerText = 'Name should have atleast 4 characters.'
            street_valid = false   
          }  else {
            document.getElementById('errStreet').style.display = 'none'
             street_valid=true
          }

          if (val_pincode.value === '') {
            document.getElementById('errPincode').innerText = 'This field cannot be empty!'
            pincode_valid = false 
          } else if (val_pincode.value.length < 6) {
            document.getElementById('errPincode').innerText = 'Pincode must not be less than 6 digits'
            pincode_valid = false 
          } else if (val_pincode.value.length > 6) {
            document.getElementById('errPincode').innerText = 'Pincode must not be more than 6 digits'
            pincode_valid = false 
          } else {
            document.getElementById('errPincode').style.display = 'none'
            pincode_valid = true
          }

          if (val_address.value === '') {
            document.getElementById('errAddress').innerText = 'This field cannot be empty!'
            address_valid = false
          } else if (val_address.value.length< 15) {
            document.getElementById('errAddress').innerText = 'Address should have atleast 15 characters.'
            address_valid = false   
          }  else {
            document.getElementById('errAddress').style.display = 'none'
              address_valid=true
          }
    

        if (name_valid && city_valid && street_valid && pincode_valid && address_valid) {
            handleSubmit();
        }

    }

    return (
        <div className="container-fluid">
            <hr />
            <form style={{display:style}}>
                <div className="form-control">
                    {/* <div className="d-flex justify-content-center mt-3">
                        <h2 className="text-secondary shaw">Add Address</h2>
                    </div> */}
                    <div className="d-flex justify-content-center">
                        <div className="col">

                            <input type="text" id="add-name" placeholder="Name" className="form-control  grad-input m-2" onChange={(e) => setAddressName(e.target.value)} />
                            <div className="d-flex justify-content-center">
                            <span id='errName' className="text-danger"></span>
                            </div>

                            <input type="text" id="add-city" placeholder="City" className="form-control   grad-input m-2" onChange={(e) => setCity(e.target.value)} />
                            <div className="d-flex justify-content-center">
                            <span id='errCity' className="text-danger"></span>
                            </div>

                            <input type="text" id="add-street" placeholder="Street" className="form-control  grad-input m-2" onChange={(e) => setStreet(e.target.value)} />
                            <div className="d-flex justify-content-center">
                            <span id='errStreet' className="text-danger"></span>
                            </div>

                            <input type="number" id="add-pincode" placeholder="Pincode" className="form-control   grad-input m-2" onChange={(e) => setPincode(e.target.value)} />
                            <div className="d-flex justify-content-center">
                            <span id='errPincode' className="text-danger"></span>
                            </div>

                            <textarea type="text"  id="add-address" cols="50" rows="4" placeholder="Address" className=" form-control  grad-input m-2" onChange={(e) => setNewAddress(e.target.value)}></textarea>
                            <div className="d-flex justify-content-center">
                            <span id='errAddress' className="text-danger"></span>
                            </div>

                            <div className="d-flex justify-content-center">
                            <button className="btn btn-raised text-dark grad-button m-4" onClick={validate} >Submit</button>
                            </div>
                        </div>
                    </div>

                    {/* <div className="form-row">
                        <div className="col">
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-between form-group">
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-between">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-between form-group">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <div className="d-flex justify-content-center">
                            </div>
                        </div>
                    </div> */}
                </div>
            </form>
        </div>
    )
}

export default AddAddressForm;
