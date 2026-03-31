import TextArea from "@/features/contact-us/components/inputs/text-area/text-area";
import TextInput from "@/features/contact-us/components/inputs/text-input/text-input";
import useContactUs from "@/features/contact-us/hooks/use-contact-us";
import { useWebsiteSettings } from "@/store/WebsiteSettingsProvider";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import { AiOutlineLoading } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { FaRegEnvelope } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";

function ContactCardSkeleton() {
  return (
    <div className="w-full max-w-sm rounded-2xl p-6 bg-[#FFF1E5] border-r-4 border-[#E2A86F] animate-pulse space-y-6">
      {/* Title */}
      <div className="h-6 w-2/3 bg-[#EAD7C5] rounded"></div>

      {/* Address Section */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#EAD7C5] rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 bg-[#EAD7C5] rounded"></div>
          <div className="h-3 w-full bg-[#EAD7C5] rounded"></div>
          <div className="h-3 w-5/6 bg-[#EAD7C5] rounded"></div>
          <div className="h-3 w-2/3 bg-[#EAD7C5] rounded"></div>
        </div>
      </div>

      {/* Phone Section */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#EAD7C5] rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-3 w-20 bg-[#EAD7C5] rounded"></div>
          <div className="h-4 w-40 bg-[#EAD7C5] rounded"></div>
        </div>
      </div>

      {/* Email Section */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#EAD7C5] rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-3 w-28 bg-[#EAD7C5] rounded"></div>
          <div className="h-4 w-48 bg-[#EAD7C5] rounded"></div>
        </div>
      </div>
    </div>
  );
}

const ContactUsPage = () => {
  const { t } = useTranslation();
  const { settings, isLoading: settingsLoading } = useWebsiteSettings();

  const contactInfo = useMemo(() => {
    if (!settings) return [];
    return [
      {
        icon: CiLocationOn,
        text: settings.contact_address!,
      },
      {
        icon: FaRegEnvelope,
        text: settings.contact_email!,
      },
      {
        icon: MdOutlineLocalPhone,
        text: settings.contact_phone!,
      },
    ] as {
      icon: IconType;
      text: string;
    }[];
  }, [settings]);

  const { methods, isPending, submit } = useContactUs();

  return (
    <div>
      <div className="relative flex items-center py-40 text-xl jutsify-center">
        <img
          src="/images/contact-us/banner-image.jpg"
          alt="banner"
          className="absolute top-0 left-0 z-0 object-cover w-full h-full"
        />
        <div className="absolute w-full h-full bg-[#F5E6D7]/80" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full gap-8">
          <h3 className="text-5xl font-bold">{t("contact-us.title")}</h3>
          <p>{t("contact-us.description")}</p>
        </div>
      </div>
      <div className="flex flex-col px-8 py-10 bg-[#f7f0e9] md:flex-row gap-4 md:gap-10 min-h-96">
        <div className="flex-1 p-10 bg-white rounded-lg shadow">
          <div className="flex flex-col gap-2 w-fit">
            <p className="text-3xl font-bold">{t("contact-us.form.title")}</p>
            <div className="bg-gradient-to-r from-[#FCA61D] to-[#855400] w-1/2 h-1.5" />
          </div>
          <form onSubmit={submit} className="grid gap-4 mt-10 md:grid-cols-2">
            <TextInput
              label="contact-us.fields.phone.label"
              placeholder="contact-us.fields.phone.placeholder"
              error={methods.formState.errors.phone?.message}
              {...methods.register("phone")}
            />
            <TextInput
              label="contact-us.fields.email.label"
              placeholder="contact-us.fields.email.placeholder"
              error={methods.formState.errors.email?.message}
              {...methods.register("email")}
            />
            <div className="md:col-span-2">
              <TextInput
                label="contact-us.fields.subject.label"
                placeholder="contact-us.fields.subject.placeholder"
                error={methods.formState.errors.subject?.message}
                {...methods.register("subject")}
              />
            </div>

            <div className="md:col-span-2">
              <TextArea
                label="contact-us.fields.message.label"
                error={methods.formState.errors.message?.message}
                {...methods.register("message")}
              />
            </div>
            <button
              className="bg-gradient-to-br from-[#FCA61D] to-[#855400] text-white font-bold py-4 px-20 rounded w-fit flex items-center justify-center disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? (
                <AiOutlineLoading className="w-5 h-5 text-white animate-spin" />
              ) : (
                t("submit")
              )}
            </button>
          </form>
        </div>
        <div className="w-full md:w-[300px]">
          {settingsLoading ? (
            <ContactCardSkeleton />
          ) : (
            <div className="p-5 bg-[#FFF1E5] border-s-2 border-s-[#855400] rounded-lg">
              <p className="text-xl font-bold">
                {t("contact-us.contact-info")}
              </p>
              <div className="flex flex-col gap-2">
                {contactInfo.map((info) => (
                  <div className="flex gap-4 mt-4">
                    <div className="flex items-center justify-center bg-white rounded-md size-12 shrink-0">
                      <info.icon className="text-[#855400]" size={25} />
                    </div>
                    <p className="font-bolder">{info.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
