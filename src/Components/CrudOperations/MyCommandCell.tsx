import React, { useEffect, useState, useRef, memo } from "react";
import { Popup } from "@progress/kendo-react-popup";

 export const MyCommandCell = props => {
  const { dataItem,setItemDel,itemDel } = props;
  const inEdit = dataItem[props.editField];
  const isNewItem = dataItem.EmployeeID === undefined;
  const anchor = useRef<HTMLButtonElement | null>(null);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (itemDel == true) {
      setShow(false)
    }
  }, [itemDel])

  return inEdit ? (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        onClick={() => (isNewItem ? props.add(dataItem) : props.update(dataItem))}
      >
        {isNewItem ? "Add" : "Update"}
      </button>
      {/* <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={() => (isNewItem ? props.discard(dataItem) : props.cancel(dataItem))}
      >
        {isNewItem ? "Discard" : "Cancel"}
      </button> */}
    </td>
  ) : (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
        onClick={() => props.edit(dataItem)}
      >
        Edit
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        onClick={() => {
          setShow(true)
        }
        }
        ref={anchor}
      >
        Remove
      </button>
      <Popup anchor={anchor.current} show={show} popupClass={"popup-content delpopup"}>
        <div>
          <p>  Confirm deleting:  {dataItem.EmployeeName}</p>
          <td className="k-command-cell">
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={() => {
                props.remove(dataItem);
                setItemDel(true)
              }
              }>Ok</button>
            <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={() => {
                setShow(false)
              }}
            >Cancel</button></td>
        </div>
      </Popup>
     </td>
  );
};