import { MdOutlineSearchOff } from "react-icons/md";
import { useTranslation } from "react-i18next";

interface BrowseEmptyStateProps {
    onAction?: () => void;
}

const BrowseEmptyState = ({
    onAction
}: BrowseEmptyStateProps) => {
    const { t } = useTranslation();

    return (
        <div className="mt-4 rounded-xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-500">
                <MdOutlineSearchOff size={28} aria-hidden="true" />
            </div>
            <h2 className="text-lg font-bold text-stone-800">{t("browse.empty.title")}</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-stone-500">{t("browse.empty.description")}</p>

            {onAction ? (
                <button
                    type="button"
                    className="mt-6 rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-100"
                    onClick={onAction}
                >
                    {t("browse.empty.action")}
                </button>
            ) : null}
        </div>
    );
};

export default BrowseEmptyState;