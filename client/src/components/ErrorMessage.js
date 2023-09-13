import React, { useEffect } from "react";
import { message } from "antd";

function ErrorMessage({ error }) {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    messageApi.open({
      type: "error",
      content: error,
    });
  }, [error, messageApi]);
  return <div>{contextHolder}</div>;
}

export default ErrorMessage;
