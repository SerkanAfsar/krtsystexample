export default function useAlertHook() {
  const handleClick = () => {
    alert("deneme");
  };
  return (
    <button type="button" onClick={() => handleClick()}>
      DENEME
    </button>
  );
}
