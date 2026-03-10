import SupportCard from "@/features/listings/components/support/support-card/SupportCard";
import { supportContacts } from "@/features/listings/data/support.data";
import { cn } from "@/lib/utils";

export default function ContactHelpSection() {
  return (
    <section className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-text md:text-3xl">
          محتاج مساعدة؟ تواصل معنا
        </h2>
      </div>

      <div
        className={cn(
          "grid gap-4",
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {supportContacts.map((item) => (
          <SupportCard
            key={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </div>
    </section>
  );
}
