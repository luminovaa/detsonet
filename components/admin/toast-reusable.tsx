"use client";

import React from "react";
import { useToast } from "@/hooks/use-toast";

export const useErrorToast = () => {
  const { error } = useToast();

  const showApiError = (err: any, customMessage?: string) => {
    const errorMessage = err?.response?.data?.message;
    const errorStatus = err?.response?.status;

    if (errorStatus === 409) {
      error(customMessage || "Data sudah ada dalam sistem", {
        title: "Data Duplikat",
      });
    } else if (errorStatus === 400) {
      error(
        customMessage ||
          "Data yang dimasukkan tidak valid. Periksa kembali form.",
        {
          title: "Data Tidak Valid",
        }
      );
    } else if (errorStatus === 401) {
      error(customMessage || "Anda tidak memiliki akses untuk melakukan ini", {
        title: "Tidak Diizinkan",
      });
    } else if (errorStatus === 403) {
      error(customMessage || "Akses ditolak", {
        title: "Akses Ditolak",
      });
    } else if (errorStatus === 404) {
      error(customMessage || "Data yang dicari tidak ditemukan", {
        title: "Data Tidak Ditemukan",
      });
    } else if (errorStatus >= 500) {
      error(
        customMessage || "Terjadi kesalahan server. Silakan coba lagi nanti.",
        {
          title: "Error Server",
        }
      );
    } else {
      error(
        customMessage ||
          errorMessage ||
          "Terjadi kesalahan yang tidak diketahui",
        {
          title: "Error",
        }
      );
    }
  };

  const showValidationError = (
    errors: Record<string, any>,
    customTitle?: string
  ) => {
    const firstError = Object.values(errors)[0];
    error(firstError?.message || "Periksa kembali data yang dimasukkan", {
      title: customTitle || "Validasi Gagal",
    });
  };

  const showNetworkError = (customMessage?: string) => {
    error(customMessage || "Koneksi bermasalah. Periksa internet Anda.", {
      title: "Masalah Koneksi",
    });
  };

  return {
    showApiError,
    showValidationError,
    showNetworkError,
  };
};

interface ErrorToastBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error) => void;
}

export const ErrorToastBoundary: React.FC<ErrorToastBoundaryProps> = ({
  children,
  fallback: Fallback,
  onError,
}) => {
  const [error, setError] = React.useState<Error | null>(null);
  const { error: showError } = useToast();

  const retry = React.useCallback(() => {
    setError(null);
  }, []);

  React.useEffect(() => {
    if (error) {
      showError("Terjadi kesalahan tak terduga", {
        title: "Error",
      });
      onError?.(error);
    }
  }, [error, showError, onError]);

  if (error && Fallback) {
    return <Fallback error={error} retry={retry} />;
  }

  return (
    <ErrorBoundaryProvider onError={setError}>{children}</ErrorBoundaryProvider>
  );
};

class ErrorBoundaryProvider extends React.Component<
  { children: React.ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: {
    children: React.ReactNode;
    onError: (error: Error) => void;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export const withErrorToast = <T extends any[], R>(
  asyncFn: (...args: T) => Promise<R>,
  options?: {
    customErrorMessage?: string;
    customTitle?: string;
    onError?: (error: any) => void;
    showLoading?: boolean;
    loadingMessage?: string;
  }
) => {
  return async (...args: T): Promise<R | undefined> => {
    const { error, info } = useToast();
    let loadingToast: any;

    try {
      if (options?.showLoading) {
        loadingToast = info(options.loadingMessage || "Memproses...", {
          title: "Loading",
        });
      }

      const result = await asyncFn(...args);

      if (loadingToast) {
        loadingToast.dismiss();
      }

      return result;
    } catch (err: any) {
      if (loadingToast) {
        loadingToast.dismiss();
      }

      const errorMessage =
        options?.customErrorMessage ||
        err?.response?.data?.message ||
        "Terjadi kesalahan";
      const errorTitle = options?.customTitle || "Error";

      error(errorMessage, { title: errorTitle });

      options?.onError?.(err);
      return undefined;
    }
  };
};

interface FormErrorToastProps {
  errors?: Record<string, any>;
  isVisible?: boolean;
  customMessage?: string;
  onDismiss?: () => void;
}

export const FormErrorToast: React.FC<FormErrorToastProps> = ({
  errors,
  isVisible,
  customMessage,
  onDismiss,
}) => {
  const { error } = useToast();

  React.useEffect(() => {
    if (isVisible && errors && Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      const toastInstance = error(
        customMessage ||
          firstError?.message ||
          "Periksa kembali data yang dimasukkan",
        {
          title: "Data Tidak Valid",
        }
      );

      if (onDismiss) {
        setTimeout(() => {
          onDismiss();
        }, 5000);
      }
    }
  }, [errors, isVisible, customMessage, error, onDismiss]);

  return null; 
};

export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: any;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

interface ErrorContextType {
  showError: (message: string, title?: string) => void;
  showApiError: (error: any, customMessage?: string) => void;
  showValidationErrors: (errors: ValidationError[]) => void;
}

const ErrorContext = React.createContext<ErrorContextType | null>(null);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { error } = useToast();

  const showError = React.useCallback(
    (message: string, title = "Error") => {
      error(message, { title });
    },
    [error]
  );

  const showApiError = React.useCallback(
    (err: any, customMessage?: string) => {
      const errorMessage = err?.response?.data?.message;
      const errorStatus = err?.response?.status;

      if (errorStatus === 409) {
        error(customMessage || "Data sudah ada dalam sistem", {
          title: "Data Duplikat",
        });
      } else if (errorStatus === 400) {
        error(customMessage || "Data yang dimasukkan tidak valid", {
          title: "Data Tidak Valid",
        });
      } else if (errorStatus >= 500) {
        error(customMessage || "Terjadi kesalahan server", {
          title: "Error Server",
        });
      } else {
        error(customMessage || errorMessage || "Terjadi kesalahan", {
          title: "Error",
        });
      }
    },
    [error]
  );

  const showValidationErrors = React.useCallback(
    (errors: ValidationError[]) => {
      if (errors.length > 0) {
        const firstError = errors[0];
        error(`${firstError.field}: ${firstError.message}`, {
          title: "Validasi Gagal",
        });
      }
    },
    [error]
  );

  const value = React.useMemo(
    () => ({
      showError,
      showApiError,
      showValidationErrors,
    }),
    [showError, showApiError, showValidationErrors]
  );

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export const useErrorContext = () => {
  const context = React.useContext(ErrorContext);
  if (!context) {
    throw new Error("useErrorContext must be used within an ErrorProvider");
  }
  return context;
};
