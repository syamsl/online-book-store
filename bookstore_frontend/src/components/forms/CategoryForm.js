import React from "react";

const CategoryForm = ({handleSubmit, name, setName}) => {

  const validate = (e) =>{
    e.preventDefault();
    var val_name = document.getElementById("cat-name")

    let name_valid = false

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

    if (name_valid) {
      handleSubmit();
  }

  }


  return (
    <form >
      <div className="form-group">
        <label>Name</label>
        <input
          id="cat-name"
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
        />
        <span id='errName' className="text-danger"></span>
        <br />  
        <button className="btn btn-raised btn-info" onClick={validate}>SAVE</button>
      </div>
    </form>
  );
};

export default CategoryForm;
