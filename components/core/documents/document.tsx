import { useToast } from "@/hooks/use-toast";
import { Document } from "@prisma/client";
import { useExpandedContext } from "../expanded-content/expanded-content";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { update } from "@/lib/actions/update";
import useUpdateEffect from "@/hooks/use-update-effect";
import { ToastProps } from "@/components/ui/toast";

interface DocumentComponentProps extends Partial<Document> {
  save: (data: Record<string, any>, id?: string) => void;
  disabled?: boolean;
}

const DocumentComponent: React.FC<DocumentComponentProps> = (props) => {
  const { toast } = useToast();
  const { expanded } = useExpandedContext();
  const [newAttribute, setNewAttribute] =
    React.useState<Partial<Document>>(props);
  const [editing, setEditing] = React.useState<boolean>(false);

  const updateAttribute = useDebouncedCallback(() => {
    const updateItem = async () => {
      const res = await update(["document", props.id], {
        ...(newAttribute as Record<string, any>),
      });
      if (res) toast(res as ToastProps);
    };
    updateItem();
  }, 1000);

  useUpdateEffect(() => {
    if (!props.id) return;
    updateAttribute();
  }, [newAttribute, updateAttribute]);

  return <div></div>;
};

export default DocumentComponent;
