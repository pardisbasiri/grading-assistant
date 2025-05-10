import * as React from "react";
import { toast as sonnerToast } from "sonner";

const useToast = () => {
  return {
    toast: sonnerToast
  };
};

export default useToast;  // Change to default export
