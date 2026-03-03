import logoImg from "../../../public/logo.png";

export default function Logo({ className = "h-8" }) {
  return (
    <img
      src={logoImg}
      alt="Logo"
      className={className}
    />
  );
}