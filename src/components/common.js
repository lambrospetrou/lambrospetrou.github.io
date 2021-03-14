export function A({href, children, ...rest}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
    {children}
  </a>
}
