import {
  forwardRef,
  useImperativeHandle,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/ui/dialog";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import toastErrorMessage from "@/utils/toastApiError";
import MainBtn from "../buttons/MainBtn";

interface ActionType {
  action?: (() => void) | (() => Promise<void>);
  text?: string;
  disabled?: boolean;
}

interface RefType {
  close: () => void;
  open: () => void;
}

interface Props {
  header?: {
    title?: string;
    description?: string;
  };
  content?: ReactNode;
  action?: ActionType;
  cancel?: ActionType;
  queryKey?: string[];
  type?: "regular" | "danger";
  onSuccess?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
}

const defaultCancelText = "cancel";
const defaultOkText = "ok";

const DialogComponent = forwardRef<RefType, PropsWithChildren<Props>>(
  (
    {
      header,
      // content,
      children,
      action,
      cancel,
      queryKey,
      type = "regular",
      onSuccess,
      onOpenChange,
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const [opened, setOpened] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        close: () => {
          setOpened(false);
        },
        open: () => setOpened(true),
      }),
      [],
    );

    const { mutate, isPending } = useMutation({
      mutationKey: [queryKey],
      mutationFn: async () => {
        const response = await action?.action?.();
        return response;
      },
      onSuccess: async (response: unknown) => {
        if (
          response &&
          typeof response === "object" &&
          "data" in response &&
          response.data &&
          typeof response.data === "object" &&
          "message" in response.data
        ) {
          toast.success(response.data.message as string);
        }
        if (queryKey)
          await queryClient.invalidateQueries({ queryKey: queryKey });
        setOpened(false);
        onSuccess?.();
      },
      onError: (error: unknown) => {
        toastErrorMessage(error as Error);
      },
    });

    return (
      <Dialog
        open={opened}
        onOpenChange={(e) => {
          setOpened(e);
          if (!e) {
            cancel?.action?.();
          }
          onOpenChange?.(e);
        }}
      >
        <DialogTrigger onClick={() => setOpened(true)} asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="w-[calc(100%-2rem)] max-w-sm rounded-3xl  bg-surface p-0 shadow-2xl">
          {/* {header && (
            <DialogHeader
              className={!content ? "border-b-0" : ""}
              autoFocus
              tabIndex={1}
            >
              {header.title && <DialogTitle>{t(header.title)}</DialogTitle>}
              {header.description && (
                <DialogDescription>{t(header.description)}</DialogDescription>
              )}
            </DialogHeader>
          )} */}
          {header && (
            <DialogHeader className="p-6 text-start" autoFocus tabIndex={1}>
              {header.title && (
                <DialogTitle className="text-lg font-semibold text-primary">
                  {t(header.title)}
                </DialogTitle>
              )}
              {header.description && (
                <DialogDescription className="mt-2 text-sm leading-6 text-text-muted">
                  {t(header.description)}
                </DialogDescription>
              )}
            </DialogHeader>
          )}
          {/* {content} */}

          <DialogFooter className="flex-col-reverse gap-3 p-6 sm:flex-row sm:justify-center">
            <DialogClose className="w-full sm:w-auto">
              <MainBtn className="w-full" variant="outline">
                {t(cancel?.text || defaultCancelText)}
              </MainBtn>
            </DialogClose>
            {action && (
              <MainBtn
                onClick={() => mutate()}
                variant={type === "danger" ? "ghost" : "outline"}
                disabled={action.disabled || isPending}
              >
                {t(action.text || defaultOkText)}
              </MainBtn>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

export default DialogComponent;
