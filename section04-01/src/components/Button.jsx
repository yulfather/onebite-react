function Button({ text, color, onClick }) {
  console.log(text, color, onClick);
  return (
    <button onClick={onClick} style={{ backgroundColor: `${color}` }}>
      <div>{text}</div>
    </button>
  );
}

export default Button;
