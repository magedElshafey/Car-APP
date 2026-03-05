import { Link } from "react-router-dom";
import { type FooterLinkGroup } from "../../types/footer.types";
import { useTranslation } from "react-i18next";
type FooterLinkGroupProps = {
  group: FooterLinkGroup;
};

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ group }) => {
  const { t } = useTranslation();
  return (
    <section aria-labelledby={`footer-group-${group.id}`}>
      <h3
        id={`footer-group-${group.id}`}
        className="text-sm font-semibold uppercase tracking-wide text-text-muted mb-2"
      >
        {t(group.title)}
      </h3>
      <ul className="space-y-1.5 text-sm">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="
                inline-flex items-center gap-1
                text-text-muted hover:text-text-main
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
                focus-visible:ring-offset-bg-surface
              "
            >
              <span>{t(link.label)}</span>
              <span
                aria-hidden="true"
                className="text-[10px] translate-y-px opacity-0 group-hover:opacity-100"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default FooterLinkGroup;
