import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Loader from "@/common/components/loader/spinner/Loader";
import LoginPrompt from "@/common/components/login-prompt/LoginPrompt";
import useAddFavorite from "@/features/browse/hooks/useAddFavorite";
import { useAuth } from "@/store/AuthProvider";
interface FavoriteButtonProps {
  productId: number;
  isInWishlist?: boolean;
  className?: string;
  showLabel?: boolean;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
  productId,
  isInWishlist = false,
  className = "",
  showLabel = true,
}) => {
  const { t } = useTranslation();
  const { mutate: toggleFavorite, isPending } = useAddFavorite();
  const { user } = useAuth();
  const handleToggleFavorite = () => {
    if (!user) return;
    else toggleFavorite(productId);
  };

  return (
    <LoginPrompt description="you need to login first , before adding cars to your wishlist">
      <button
        className={`  flex items-center gap-2 ${className}`}
        onClick={handleToggleFavorite}
        disabled={isPending}
        aria-label={t("wishlist")}
      >
        {isPending ? (
          <Loader />
        ) : isInWishlist ? (
          <FaHeart className="text-primary" aria-hidden="true" />
        ) : (
          <FaRegHeart aria-hidden="true" className="text-text-muted" />
        )}
        {showLabel && <p className="pb-1 text-lg">{t("wishlist")}</p>}
      </button>
    </LoginPrompt>
  );
};

export default FavoriteButton;
