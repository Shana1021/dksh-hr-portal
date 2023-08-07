export default function SignInField({ type, name, value, placeholder, error = "", onChange }) {
  return (
    <div className="sign-in-field">
      <label for={name}>{name}</label>
      <br />
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <br />
      <span className="error">{error}</span>
    </div>
  );
}