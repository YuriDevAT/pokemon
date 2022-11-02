export const LoadButton = (props: { onClick: () => void }) => {
  return (
    <button type="button" className="button-more" onClick={props.onClick}>
      Catch more pokemon &#9863;
    </button>
  );
};