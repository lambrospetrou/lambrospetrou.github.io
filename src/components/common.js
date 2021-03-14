// <a> to an external site.
export function Aex({href, children, ...rest}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
    {children}
  </a>
}
