const MessageForms = ({ children }) => {
  return (
    <div
      className="px-4 py-3 rounded relative mb-5 text-center bg-red-100 border border-red-400 text-red-700"
      role="alert"
    >
      {children}
      <strong className="font-bold" />
    </div>
  );
};

export default MessageForms;
