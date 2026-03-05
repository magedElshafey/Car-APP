const MetaItem: React.FC<{
  icon?: React.ReactNode;
  children: React.ReactNode;
}> = ({ icon, children }) => (
  <li className="inline-flex items-center gap-1.5 text-[11px] md:text-xs text-[color:var(--section-muted-color)]">
    {icon && <span aria-hidden="true">{icon}</span>}
    <span>{children}</span>
  </li>
);

export default MetaItem;
