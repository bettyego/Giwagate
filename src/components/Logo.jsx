import logo from '../assets/brand/logo.png'
import logoLight from '../assets/brand/logo-light.png'
import './Logo.css'

/**
 * Giwagate logo. Both versions are rendered and CSS shows the one that suits
 * the background: navy for light areas, cream for dark ones (the footer and
 * the see-through header over the home page photo).
 * Generated from src/assets/Glogo (2).png with its background removed.
 */
export default function Logo() {
  return (
    <span className="logo">
      <img className="logo__img logo__img--dark" src={logo} alt="Giwagate Properties" width="953" height="240" />
      <img className="logo__img logo__img--light" src={logoLight} alt="Giwagate Properties" width="953" height="240" />
    </span>
  )
}
