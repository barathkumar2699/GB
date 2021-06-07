import React,{useState,useContext} from "react";
import ItemContext from '../../context/item/ItemContext'


const EnquiryForm = (props) => {

    const itemContext =useContext(ItemContext);
    const {addEnquiry}=itemContext;

    const [enquiry, setEnquiry] = useState({
        name:"",
        address:"",
        phone:"",
        email:"",
        subject:"",
        message:""
    })
    const onChange = (e) => {
        console.log(e.target);
        setEnquiry({ ...enquiry, [e.target.name]: e.target.value });
      }


    const resetValue=()=>{
        setEnquiry({
            name:"",
        address:"",
        phone:"",
        email:"",
        subject:"",
        message:""
        })
    }
    const {name,address,phone,email,subject,message}=enquiry;
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(enquiry)
        addEnquiry(enquiry)
        resetValue()
    }
  return (
    <div>
      We thank you for the keen interest evinced in our services. Please do fill
      the enquiry form with your requirements and we’ll be most glad to revert
      to you within the next 24 hours.
      <div>
        <form onSubmit={onSubmit}>
          <div class="form-group row">
            <label htmlFor="name" class="col-sm-2 col-form-label">
              Name
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                placeholder="Name"
                class="form-control"
                name="name"
                value={name}
                onChange={onChange}
                
              />
            </div>
          </div>
          <div class="form-group row">
            <label htmlFor="address" class="col-sm-2 col-form-label">
              Address
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                name="address"
                placeholder="Address"
                value={address}
                onChange={onChange}
              />
            </div>
          </div>
          <div class="form-group row">
            <label htmlFor="phone" class="col-sm-2 col-form-label">
              Phone
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                placeholder="Phone"
                class="form-control"
                name="phone"
                value={phone}
                onChange={onChange}
                
              />
            </div>
          </div>
          <div class="form-group row">
            <label htmlFor="email" class="col-sm-2 col-form-label">
              Email
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                placeholder="Email"
                class="form-control"
                name="email"
                value={email}
                onChange={onChange}
                
              />
            </div>
          </div>
          <div class="form-group row">
            <label htmlFor="subject" class="col-sm-2 col-form-label">
              Subject
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                placeholder="Subject"
                class="form-control"
                name="subject"
                value={subject}
                onChange={onChange}
                
              />
            </div>
          </div>
          <div class="form-group row">
            <label htmlFor="message" class="col-sm-2 col-form-label">
              Message
            </label>
            <div class="col-sm-10">
            <textarea placeholder="message" id="message" name="message" rows="4" className="form-control" value={message}
                onChange={onChange} />
            </div>
          </div>
          <div class="row justify-content-center">
           <button type="submit" className="btn btn-success" >Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};



export default EnquiryForm;
