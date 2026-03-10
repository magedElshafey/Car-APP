import clsx from "clsx";

type ServicePromoCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  onClick?: () => void;
  className?: string;
};

export default function ServicePromoCard({
  title,
  description,
  image,
  imageAlt,
  onClick,
  className,
}: ServicePromoCardProps) {
  return (
    <article
      onClick={onClick}
      className={clsx(
        `
        group relative overflow-hidden rounded-[22px]
        bg-gray
        transition-all duration-300 ease-out
        hover:-translate-y-[2px] 
        `,
        className,
      )}
    >
      <div className="flex min-h-[236px] flex-col px-5 pt-5">
        {/* text */}
        <div className="text-center">
          <h3 className="text-[18px] font-extrabold leading-8 text-[#1f1f1f]">
            {title}
          </h3>

          <p className="mt-1 text-[14px] leading-7 text-[#666]">
            {description}
          </p>
        </div>

        {/* image */}
        <div className="relative mt-auto flex h-[118px] items-end justify-center overflow-hidden">
          <img
            src={image}
            alt={imageAlt || title}
            className="
              h-auto max-h-[108px] w-auto max-w-[92%] object-contain
              transition-transform duration-300 ease-out
              group-hover:scale-[1.02]
            "
          />
        </div>
      </div>
    </article>
  );
}
