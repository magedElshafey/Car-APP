import React from "react";
import HeroLayout from "@/common/layout/hero-layout/HeroLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MainInput from "@/common/components/inputs/MainInput";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import useSubmitContactus from "../api/useSubmitContactus";
import { contactSchema, ContactFormValues } from "../schema/contact.schema";
import { useTranslation } from "react-i18next";
import handlePromisError from "@/utils/handlePromiseError";
import { toast } from "sonner";
import PageSeo from "@/common/components/seo/PageSeo";
import useNewsLetterApi from "@/common/layout/website/footer/newsletter/api/useNewsLetterApi";
const ContactPage: React.FC = () => {
  const { isPending, mutateAsync } = useSubmitContactus();
  const { mutateAsync: mutateNewsLetter } = useNewsLetterApi();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    getValues,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactFormValues) => {
    const email = getValues().email;
    try {
      const response = await mutateAsync(data);
      if (response?.status) {
        toast.success(response.message);
        mutateNewsLetter(email);
        reset();
      }
    } catch (error) {
      handlePromisError(error);
    }
  };

  return (
    <>
      <PageSeo
        title="Contact WiseFollowUp"
        description="Contact Wise Follow Up for questions, feedback, or to report an issue. We value your input and aim to improve patient-friendly medical information."
        canonicalPath="/contact-us"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Wise Follow Up Contact",
          url: "https://wisefollowup.com/contact",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "hello@wisefollowup.com",
            telephone: "+44 20 0000 0000",
            areaServed: "GB",
            availableLanguage: ["English"],
          },
        }}
      />

      {/* HERO */}
      <HeroLayout minHeight="min-h-[45vh]">
        <div className="containerr text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-text-main">
            {t("Contact us")}
          </h1>
          <p className="mt-3 text-text-muted max-w-xl mx-auto">
            {t(
              "Questions, feedback, or found an issue? Your message helps us improve Wise Follow Up.",
            )}
          </p>
        </div>
      </HeroLayout>

      {/* MAIN CONTENT */}
      <section className="containerr py-section-y grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* FORM */}
        <div className="rounded-card bg-bg-surface border border-border-subtle p-6 shadow-soft">
          <h2 className="text-lg font-semibold mb-4">
            {t("Send us a message")}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <MainInput
              label="Your name"
              required
              {...register("name")}
              error={errors.name?.message}
            />

            <MainInput
              label="Email address"
              type="email"
              required
              {...register("email")}
              error={errors.email?.message}
            />

            <MainInput label="Subject" {...register("subject")} />

            <MainTextArea
              label="Message"
              rows={5}
              required
              {...register("message")}
              error={errors.message?.message}
            />

            <button
              type="submit"
              disabled={!isValid || isPending}
              className="rounded-pill bg-primary px-6 py-2 text-white font-semibold disabled:opacity-60"
            >
              {isPending ? t("Sending…") : t("Send message")}
            </button>
          </form>
        </div>

        {/* SIDE SECTIONS */}
        <div className="space-y-6">
          {/* Report issue */}
          <div className="rounded-card bg-bg-page border border-border-subtle p-5">
            <h3 className="font-semibold mb-2">🚨 {t("Report an issue")}</h3>
            <p className="text-sm text-text-muted">
              {t(
                "Found incorrect information, a broken link, or outdated content? Please report it so we can fix it quickly.",
              )}
            </p>
          </div>

          {/* Expectations */}
          <div className="rounded-card bg-bg-page border border-border-subtle p-5">
            <h3 className="font-semibold mb-2">ℹ️ {t("What to expect")}</h3>
            <ul className="text-sm text-text-muted list-disc pl-5 space-y-1">
              <li>{t("We usually reply within a few working days")}</li>
              <li>{t("This is not an emergency service")}</li>
              <li>{t("Messages are reviewed by the Wise Follow Up team")}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
