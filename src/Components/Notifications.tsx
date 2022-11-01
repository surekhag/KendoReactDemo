import React from "react";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";

const DelNotifications = (props) => {
  const { notifyDelstate, setNotifyDelState } = props;
  const { success } = notifyDelstate || false;
// console.log("del notification",notifyDelstate)
  return (<NotificationGroup
    style={{
      right: "110px",
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
          onClose={() => setNotifyDelState({ success: false })}
        >
          <span>Employee Info has been removed!</span>
        </Notification>
      )}
    </Fade>
  </NotificationGroup>

  )
}
export { DelNotifications};
