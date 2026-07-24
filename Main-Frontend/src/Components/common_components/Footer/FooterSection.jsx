import { Link } from 'react-router-dom';

const FooterSection = ({ title, links }) => {
  const headingId = `footer-${title.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <nav aria-labelledby={headingId}>
      <h3
        className="mb-6 text-base font-medium text-gray-300 text-[20px]"
        id="footer-product-5-logo"
      >
        {title}
      </h3>
      <ul>
        {links.map(({ label, path }) => (
          <li className="mb-2 leading-6" key={path}>
            <Link
              to={path}
              className="transition-colors duration-300 hover:text-white focus:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterSection;
