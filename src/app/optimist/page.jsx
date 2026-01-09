"use client";

import React, { useOptimistic } from "react";

export default function Page() {
  const formRef = React.useRef(null);
  const [messages, setMessages] = React.useState([
    { id: 1, title: "default message" },
  ]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        id: crypto.randomUUID(),
        title: newMessage,
      },
    ]
  );

  async function apiMethod(message) {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
    return message;
  }
  const formAction = async (formData) => {
    try {
      const message = formData.get("message");

      addOptimisticMessage(message);

      const response = await apiMethod(message);
      formRef.current.reset();
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          title: `${response} - post success api call`,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="enter text here" />
        <button>submit</button>
      </form>
      <ul>
        {optimisticMessages.map((prev) => {
          return <li key={prev.id}>{prev.title}</li>;
        })}
      </ul>
    </>
  );
}
