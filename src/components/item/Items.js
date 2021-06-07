import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemList from "./ItemList";
import ItemContext from "../../context/item/ItemContext";
import Spinner from "../../components/layout/Spinner";
import { Container, Button } from "react-floating-action-button";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


const RenderModal = ({
  modal,
  toggle,
  addBattery,
  current,
  updateBattery,
  addItem,
  clearCurrent,
}) => {
  const [battery, setBattery] = useState({
    name: "",
    image: "",
    price: "",
    discount: "",
    description: {
      capacity: "",
      brand: "",
      type: "",
      voltage: "",
      technology: "",
      dimension: "",
      weight: "",
      warranty: "",
    },
  });

  useEffect(() => {
    if (current) {
      setBattery(current);
    } else {
      resetValue();
    }
  }, [current]);

  const resetValue = () => {
    setBattery({
      name: "",
      image: "",
      price: "",
      discount: "",
      description: {
        capacity: "",
        brand: "",
        type: "",
        voltage: "",
        technology: "",
        dimension: "",
        weight: "",
        warranty: "",
      },
    });
  };

  const { name,image ,price, discount, description } = battery;

  const onChange = (e) => {
    console.log(e.target);
    setBattery({ ...battery, [e.target.name]: e.target.value });
  };
  const onObject = (e) => {
    e.persist();
    setBattery((prevState) => ({
      ...prevState,
      description: {
        ...prevState.description,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(battery);

    if (current === null) {
      addBattery(battery);
    } else {
      updateBattery(battery);
    }
    toggle();
    resetValue();
  };


  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        // setSelectedFile(undefined)
        return
    }
    console.log(e.target)
    var reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    console.log(reader )
    reader.onload =function(e){
      console.log(e.target)
      setBattery({ ...battery, "image": e.target.result });
    }



    

    // I've kept this example simple by using the first image instead of multiple
    // setSelectedFile(e.target.files[0])
}

  return (
    <Modal isOpen={modal} toggle={toggle} className="">
      <ModalHeader toggle={toggle}>Add Battery</ModalHeader>
      <ModalBody>
        <form className="form" onSubmit={onSubmit}>
          <label htmlFor="img">Select image:</label>
          <input type="file" className="" name="image" accept="image/*" onChange={onSelectFile} />
          {image!==""&&(<img  src={image} alt="preview" height="50px" width="50px"/>)}<br></br>
          name:
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={onChange}
          />
          price:
          <input
            type="text"
            className="form-control"
            name="price"
            value={price}
            onChange={onChange}
          />
          discount:
          <input
            type="text"
            className="form-control"
            name="discount"
            value={discount}
            onChange={onChange}
          />
          capacity:
          <input
            type="text"
            className="form-control"
            name="capacity"
            value={description.capacity}
            onChange={onObject}
          />
          brand:
          <input
            type="text"
            className="form-control"
            name="brand"
            value={description.brand}
            onChange={onObject}
          />
          type:
          <input
            type="text"
            className="form-control"
            name="type"
            value={description.type}
            onChange={onObject}
          />
          voltage:
          <input
            type="text"
            className="form-control"
            name="voltage"
            value={description.voltage}
            onChange={onObject}
          />
          technology:
          <input
            type="text"
            className="form-control"
            name="technology"
            value={description.technology}
            onChange={onObject}
          />
          dimension:
          <input
            type="text"
            className="form-control"
            name="dimension"
            value={description.dimension}
            onChange={onObject}
          />
          weight:
          <input
            type="text"
            className="form-control"
            name="weight"
            value={description.weight}
            onChange={onObject}
          />
          warranty:
          <input
            type="text"
            className="form-control"
            name="warranty"
            value={description.warranty}
            onChange={onObject}
          />
          <ModalFooter>
            {/* <button type="submit" color="primary">
            Do Something
          </button>{" "} */}
            {current === null ? (
              <div>
                <input type="submit" value="Add" />{" "}
              </div>
            ) : (
              <div>
                <input type="submit" value="Update" />{" "}
              </div>
            )}
            <button color="secondary" type="button" onClick={toggle}>
              Cancel
            </button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );


};
const Items = (props) => {
  const itemContext = useContext(ItemContext);
  const {
    getAllBatteries,
    batteries,
    loading,
    admin,
    current,
    clearCurrent,
    updateBattery,
  } = itemContext;
  const { addBattery } = itemContext;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getAllBatteries();
    // getLoginStatus()

    //eslint-disable-next-line
  },[] );
  const addItem = () => {
    clearCurrent();

    toggle();
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="row">
      {batteries == null
        ? "Currenty Out of stock Please Check after sometime"
        : batteries.map((item) => (
            <div className="col-md-6 col-lg-3 col-sm-6" key={item.id}>
              <ItemList item={item} toggle={toggle} />

              <div className="w-100 hidden-md-up"></div>
            </div>
          ))}
      {admin === true ? (
        <div>
          <RenderModal
            modal={modal}
            toggle={toggle}
            addBattery={addBattery}
            current={current}
            updateBattery={updateBattery}
            addItem={addItem}
            clearCurrent={clearCurrent}
          />

          <Container>
            <Button onClick={addItem} icon="fa fa-plus" />
            <Button tooltip="Add Battery here" icon="fa fa-caret-square-o-up" />
          </Container>
        </div>
      ) : null}
    </div>
  );
};

Items.propTypes = {
  batteries: PropTypes.object,
};

export default Items;
