export const Popup = ({ setShow, children, popupTopMargin = "" }) => {
  return (
    <div
      className={`popup`}
      onClick={setShow}
      style={{ marginTop: popupTopMargin }}
    >
      {children}
    </div>
  );
};
