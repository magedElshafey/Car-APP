export interface Setting {
  seo_title?: string;
  seo_description?: string;
  app_logo: string | null;
  contact_email?: string;
  contact_phone?: string;
  social_facebook?: string;
  social_twitter?: string;
  social_linkedin?: string
  social_youtube?: string
  social_instagram?: string;
  app_favicon: string;
  app_url: string,
  app_slogan?: string;
  not_emergency?: string
  for_clinicians?: string

  footer_disclaimer_description: string,
  footer_disclaimer_plain_text: string,
  footer_disclaimer_focus_on: string

  copyrights_disclaimer?: string
}

