import React from "react";
import HeroLayout from "@/common/layout/hero-layout/HeroLayout";
import PageSeo from "@/common/components/seo/PageSeo";
import MainInput from "@/common/components/inputs/MainInput";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import MainBtn from "@/common/components/buttons/MainBtn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  submitReviewSchema,
  SubmitReviewValues,
} from "../schema/review.schema";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import useSubmitReview from "../api/useSubmitReview";
import handlePromisError from "@/utils/handlePromiseError";
import useNewsLetterApi from "@/common/layout/website/footer/newsletter/api/useNewsLetterApi";
const SubmitReviewPage: React.FC = () => {
  const { t } = useTranslation();
  const submitReview = useSubmitReview();
  const { mutateAsync: mutateNewsLetter } = useNewsLetterApi();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
    getValues,
  } = useForm<SubmitReviewValues>({
    resolver: zodResolver(submitReviewSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: SubmitReviewValues) => {
    const email = getValues().email;
    try {
      const response = await submitReview.mutateAsync(data);
      if (response?.status) {
        toast.success(t(response?.message));
        mutateNewsLetter(email);
        reset();

      }
    } catch (error) {
      handlePromisError(error);
    }
  };

  /* --------------------------- SEO Structured Data -------------------------- */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Submit a review",
    description:
      "Submit feedback or a review to help improve patient-friendly medical information.",
    mainEntity: {
      "@type": "Review",
      reviewBody: "User submitted review",
      author: {
        "@type": "Person",
        name: "Anonymous",
      },
    },
  };

  return (
    <>
      <PageSeo
        title="Submit a review"
        description="Share your feedback to help improve Wise Follow Up medical leaflets."
        canonicalPath="/submit-review"
        structuredData={structuredData}
      />

      {/* ================= Hero ================= */}
      <HeroLayout minHeight="min-h-[40vh]">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-text-main">
            {t("Submit a review")}
          </h1>
          <p className="mt-3 text-text-muted">
            {t(
              "Your feedback helps us improve clarity, accuracy, and usability for patients.",
            )}
          </p>
        </div>
      </HeroLayout>

      {/* ================= Content ================= */}
      <main className="containerr py-section-y max-w-3xl">
        <section
          className="rounded-card bg-bg-surface border border-border-subtle p-6 md:p-8 shadow-soft"
          aria-labelledby="review-form-heading"
        >
          <h2
            id="review-form-heading"
            className="text-lg font-semibold text-text-main mb-6"
          >
            {t("Your review")}
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <MainInput
              label="Review title"
              placeholder="Short summary"
              required
              {...register("title")}
              error={errors.title?.message}
            />

            <MainInput
              label="Your name"
              placeholder="Your name"
              required
              {...register("name")}
              error={errors.name?.message}
            />

            <MainInput
              label="Email address"
              type="email"
              placeholder="you@example.com"
              required
              {...register("email")}
              error={errors.email?.message}
            />

            <MainTextArea
              label="Your feedback"
              placeholder="Share your experience or suggestion…"
              required
              rows={5}
              {...register("comment")}
              error={errors.comment?.message}
            />

            {/* Safety note */}
            <p className="text-xs text-text-muted leading-relaxed">
              {t(
                "This form is for feedback only. Do not include personal medical information.",
              )}
            </p>

            <div className="pt-4 flex justify-end">
              <MainBtn
                type="submit"
                disabled={!isValid || isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? t("Sending…") : t("Submit review")}
              </MainBtn>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default SubmitReviewPage;
