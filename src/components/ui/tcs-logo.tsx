import logoTcs from "../../../public/tcs-logo.png";

export default function LogoTcs({ className = "h-8" }) {
  return (
    <img
      src={logoTcs}
      alt="Logo"
      className={className}
    />
  );
}