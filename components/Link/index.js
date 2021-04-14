/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import RBNavLink from 'react-bootstrap/NavLink';
import { useRouter } from 'next/router';
import NLink from 'next/link';

import { buildClassNames } from 'utils/classnames';

export const getPaths = (asPath) => {
  const [slashPath, query] = decodeURIComponent(asPath).split('?');
  const pathname = slashPath.replace(/\/$/, '');
  const href = query ? [pathname, query].join('?') : pathname;

  return [href, pathname, query];
};

export const Link = ({ children, className, onClick, ...props }) => {
  return (
    <NLink {...props}>
      <a className={className} onClick={onClick}>
        {children}
      </a>
    </NLink>
  );
};

export const isActive = (href, asPath, exact) => {
  if (exact) {
    return href === asPath;
  }
  return asPath.startsWith(href);
};

export const NavLink = ({
  children,
  exact,
  active,
  className,
  activeClassName,
  ...props
}) => {
  const { asPath } = useRouter();
  const classes =
    active || isActive(props.href, asPath, exact)
      ? buildClassNames(className, activeClassName || 'active')
      : className;

  return (
    <NLink {...props} passHref>
      <RBNavLink className={classes} onClick={props.onClick}>
        {children}
      </RBNavLink>
    </NLink>
  );
};
