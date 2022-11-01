import React, { useEffect, useState, useRef } from "react";
import { Popup } from "@progress/kendo-react-popup";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
interface State1 {
  success: boolean;
}

export const MyCommandCell = props => {
  const { dataItem } = props;
  const inEdit = dataItem[props.editField];
  const isNewItem = dataItem.EmployeeID === undefined;
  const anchor = useRef<HTMLButtonElement | null>(null);

  const [show, setShow] = useState(false);
  const [notifystate, setNotifyState] = React.useState<State1>({
    success: false
  });
  const [itemDel, setItemDel] = React.useState(false);
  useEffect(() => {
    if (itemDel == true) {
      setShow(false)
      setNotifyState({ success: true });
    }
  }, [itemDel])
  const { success } = notifystate;

  return inEdit ? (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        onClick={() => (isNewItem ? props.add(dataItem) : props.update(dataItem))}
      >
        {isNewItem ? "Add" : "Update"}
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={() => (isNewItem ? props.discard(dataItem) : props.cancel(dataItem))}
      >
        {isNewItem ? "Discard" : "Cancel"}
      </button>
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
                setNotifyState({ success: true })
              }
              }>Ok</button>
            <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={() => {
                setShow(false)
              }}
            >Cancel</button></td>
        </div>

      </Popup>
      <NotificationGroup
        style={{
          left: "-140px",
          top: "0px",
          alignItems: "flex-start",
          flexWrap: "wrap-reverse",
        }}
      >
        <Fade>
          {success && (
            <Notification
              type={{ style: "success", icon: true }}
              closable={true}
              onClose={() => setNotifyState({ success: false })}
            >
              <span>Employee Info has been removed!</span>
            </Notification>
          )}
        </Fade>
      </NotificationGroup>

    </td>
  );
};
