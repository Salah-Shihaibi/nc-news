export const Popup = ({ setShow, children }) => {
  return (
    <div
      className="popup"
      onClick={() => {
        setShow(false);
      }}
    >
      {children}
    </div>
  );
};
